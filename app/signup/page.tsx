import Link from "next/link";
import { redirect } from "next/navigation";

import { AuthCard } from "@/components/sections/auth-card";
import { AuthForm } from "@/components/sections/auth-form";
import { signup } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "회원가입 — 오늘 어디 갈래?",
};

export default async function SignupPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/");

  return (
    <AuthCard
      title="회원가입"
      description="가입하면 맞춤 코스 추천과 커뮤니티를 모두 이용할 수 있어요."
      footer={
        <>
          이미 가입하셨나요?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            로그인
          </Link>
        </>
      }
    >
      <AuthForm
        action={signup}
        submitLabel="회원가입"
        pendingLabel="가입 중…"
      />
    </AuthCard>
  );
}
