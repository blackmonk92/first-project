"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { isRegion } from "@/lib/community/regions";
import { isCategory } from "@/lib/community/categories";

export type CreatePostValues = {
  title: string;
  content: string;
  region: string;
  category: string;
  placeName: string;
  placeUrl: string;
};

export type CreatePostState = {
  error?: string;
  values?: CreatePostValues;
} | null;

export async function createPost(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  // 검증 실패 시 사용자 입력을 그대로 돌려보내 폼 리셋을 무력화한다.
  const values: CreatePostValues = {
    title: String(formData.get("title") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    region: String(formData.get("region") ?? ""),
    category: String(formData.get("category") ?? ""),
    placeName: String(formData.get("place_name") ?? "").trim(),
    placeUrl: String(formData.get("place_url") ?? "").trim(),
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "로그인이 필요해요.", values };

  if (!values.title) return { error: "제목을 입력해주세요.", values };
  if (values.title.length > 80)
    return { error: "제목은 80자 이하로 입력해주세요.", values };
  if (!values.content) return { error: "내용을 입력해주세요.", values };
  if (values.content.length > 1000)
    return { error: "내용은 1000자 이하로 입력해주세요.", values };
  if (!isRegion(values.region))
    return { error: "지역을 선택해주세요.", values };
  if (!isCategory(values.category))
    return { error: "장소 구분을 선택해주세요.", values };

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      title: values.title,
      content: values.content,
      region: values.region,
      category: values.category,
      place_name: values.placeName || null,
      place_url: values.placeUrl || null,
    })
    .select("id")
    .single();

  if (error) {
    return { error: `글 저장에 실패했어요. (${error.message})`, values };
  }

  revalidatePath("/community");
  revalidatePath("/");
  redirect(`/community/${data.id}`);
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS가 본인 글만 삭제 허용 → user_id 추가 조건은 안전 장치.
  await supabase.from("posts").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/community");
  revalidatePath("/");
  redirect("/community");
}

export async function toggleLike(formData: FormData) {
  const postId = String(formData.get("post_id") ?? "");
  if (!postId) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: existing } = await supabase
    .from("likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("user_id", user.id);
  } else {
    await supabase.from("likes").insert({ post_id: postId, user_id: user.id });
  }

  revalidatePath(`/community/${postId}`);
  revalidatePath("/community");
  revalidatePath("/");
}

export type CreateCommentState = {
  error?: string;
  values?: { content: string };
} | null;

export async function createComment(
  _prev: CreateCommentState,
  formData: FormData,
): Promise<CreateCommentState> {
  const postId = String(formData.get("post_id") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const values = { content };

  if (!postId) return { error: "잘못된 요청이에요.", values };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "로그인이 필요해요.", values };

  if (!content) return { error: "댓글 내용을 입력해주세요.", values };
  if (content.length > 500)
    return { error: "댓글은 500자 이하로 입력해주세요.", values };

  const { error } = await supabase
    .from("comments")
    .insert({ post_id: postId, user_id: user.id, content });

  if (error) {
    return { error: `댓글 저장에 실패했어요. (${error.message})`, values };
  }

  revalidatePath(`/community/${postId}`);
  revalidatePath("/community");
  revalidatePath("/");
  return null;
}

export async function deleteComment(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const postId = String(formData.get("post_id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (postId) revalidatePath(`/community/${postId}`);
  revalidatePath("/community");
  revalidatePath("/");
}
