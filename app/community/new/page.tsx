import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { createClient } from "@/lib/supabase/server";
import { NewPostForm } from "./new-post-form";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

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
            새 글 쓰기
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            다녀온 장소 한 곳을 짧게 공유해주세요. 다른 사람의 주말에 보탬이 돼요.
          </p>
          <div className="mt-8">
            <NewPostForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
