import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { createClient } from "@/lib/supabase/server";
import { NicknameForm } from "./nickname-form";

export const dynamic = "force-dynamic";

export default async function MyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nickname")
    .eq("id", user.id)
    .single();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-2xl px-6 py-14 md:py-20">
          <Link
            href="/community"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← 커뮤니티로
          </Link>
          <h1 className="mt-6 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            마이페이지
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            닉네임은 커뮤니티 글·댓글에 표시되는 이름이에요.
            <br />
            언제든 바꿀 수 있어요.
          </p>
          <div className="mt-8">
            <NicknameForm currentNickname={profile?.nickname ?? ""} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
