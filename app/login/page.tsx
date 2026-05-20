import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components/sections/auth-card";
import { AuthForm } from "@/components/sections/auth-form";
import { login } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "로그인 — 오늘 어디 갈래?",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  return (
    <AuthCard
      title="로그인"
      description="저장해둔 코스와 알림 설정을 이어서 사용하세요."
      footer={
        <>
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            회원가입
          </Link>
        </>
      }
    >
      <AuthForm
        action={login}
        submitLabel="로그인"
        pendingLabel="로그인 중…"
      />
    </AuthCard>
  );
}
