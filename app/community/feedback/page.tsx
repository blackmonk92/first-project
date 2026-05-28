import Link from "next/link";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { CategoryFilter } from "@/components/community/category-filter";
import { CommunityNav } from "@/components/community/community-nav";
import {
  PostCardGrid,
  PostsEmptyState,
} from "@/components/community/post-card-list";
import { FEEDBACK_CATEGORIES } from "@/lib/community/categories";
import { listPosts, parseCategoryFilter } from "@/lib/community/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string }>;

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categoryParam } = await searchParams;
  const activeCategory = parseCategoryFilter(categoryParam, "feedback");
  const [posts, supabase] = await Promise.all([
    listPosts({ postType: "feedback", category: activeCategory }),
    createClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const writeHref = user
    ? "/community/feedback/new"
    : "/login?next=/community/feedback/new";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
                의견 모음
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                서비스에 바라는 점을 들려주세요
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                버그 신고, 개선 제안, 질문, 후기까지 —{" "}
                <br className="sm:hidden" />
                짧게 남겨주신 한마디가 다음 업데이트를 만듭니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
          <div className="mb-6">
            <CommunityNav active="feedback" />
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              active={activeCategory}
              categories={FEEDBACK_CATEGORIES}
              basePath="/community/feedback"
            />
            <Link
              href={writeHref}
              className="inline-flex shrink-0 items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              의견 남기기 →
            </Link>
          </div>

          <div className="mt-8">
            {posts.length === 0 ? (
              <PostsEmptyState
                title="첫 번째 의견을 남겨보세요"
                description={
                  activeCategory === "all" ? (
                    <>
                      아직 등록된 의견이 없어요.{" "}
                      <br className="sm:hidden" />
                      작은 불편이나 바라는 점을 알려주세요.
                    </>
                  ) : (
                    <>
                      {`'${activeCategory}' 의견이 아직 없어요.`}{" "}
                      <br className="sm:hidden" />첫 의견을 남겨보세요.
                    </>
                  )
                }
                cta={{
                  href: writeHref,
                  label: user ? "의견 남기기" : "로그인하고 의견 남기기",
                }}
              />
            ) : (
              <PostCardGrid posts={posts} currentUserId={user?.id ?? null} />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
