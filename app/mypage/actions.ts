"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { validateNickname } from "@/lib/moderation";

export type UpdateNicknameState = {
  error?: string;
  value?: string; // 입력 닉네임 되돌려주기(폼 유지)
  success?: boolean;
} | null;

export async function updateNickname(
  _prev: UpdateNicknameState,
  formData: FormData,
): Promise<UpdateNicknameState> {
  const raw = String(formData.get("nickname") ?? "");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "로그인이 필요해요.", value: raw };

  // C2 검증을 UPDATE 전에 호출(길이→문자셋→욕설, 첫 실패 1개 메시지).
  const v = validateNickname(raw);
  if (!v.ok) return { error: v.message, value: raw };

  // validateNickname은 OK/fail만 주므로 저장용으로 재trim(앞뒤 공백 제거).
  const nickname = raw.trim();

  // updated_at은 BEFORE UPDATE 트리거(profiles_set_updated_at)가 갱신 → 여기선 nickname만.
  // RLS(profiles_update_own)가 본인만 허용 → id 조건은 이중 안전장치.
  const { error } = await supabase
    .from("profiles")
    .update({ nickname })
    .eq("id", user.id);

  if (error) {
    // lower(nickname) 유니크 인덱스(profiles_nickname_lower_key) 위반 → 23505.
    // 사전 SELECT 대신 인덱스 위반을 잡는다(TOCTOU 경합 회피).
    if (error.code === "23505")
      return { error: "이미 사용 중인 닉네임이에요.", value: nickname };
    return { error: "닉네임 변경에 실패했어요.", value: nickname };
  }

  // 닉네임은 글·댓글 작성자 표시(author_nickname)로 노출 → 목록·홈 재검증.
  revalidatePath("/community");
  revalidatePath("/");
  revalidatePath("/mypage");
  return { success: true, value: nickname };
}
