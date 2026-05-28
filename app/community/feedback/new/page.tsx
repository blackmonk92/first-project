import Link from "next/link";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { createClient } from "@/lib/supabase/server";
import { FeedbackForm } from "@/components/community/feedback-form";

export const dynamic = "force-dynamic";

export default async function NewFeedbackPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/community/feedback/new");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-2xl px-6 py-14 md:py-20">
          <Link
            href="/community/feedback"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← 의견 모음으로
          </Link>
          <h1 className="mt-6 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            의견 남기기
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            서비스를 쓰면서 느낀 점, 불편함, 바라는 기능을 알려주세요. 더 나은
            서비스를 만드는 데 큰 도움이 돼요.
          </p>
          <div className="mt-8">
            <FeedbackForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
