import Link from "next/link";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { RegionFilter } from "@/components/community/region-filter";
import {
  PostCardGrid,
  PostsEmptyState,
} from "@/components/community/post-card-list";
import { listPosts, parseRegionFilter } from "@/lib/community/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ region?: string }>;

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { region: regionParam } = await searchParams;
  const activeRegion = parseRegionFilter(regionParam);
  const [posts, supabase] = await Promise.all([
    listPosts({ region: activeRegion }),
    createClient(),
  ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const writeHref = user ? "/community/new" : "/login?next=/community/new";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-card/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
                커뮤니티
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                지금 사람들이 공유하는 장소
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                다녀온 장소를 짧게 적어 다른 사람의 주말에 보태주세요.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <RegionFilter active={activeRegion} />
            <Link
              href={writeHref}
              className="inline-flex shrink-0 items-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              글 쓰기 →
            </Link>
          </div>

          <div className="mt-8">
            {posts.length === 0 ? (
              <PostsEmptyState
                title="첫 번째 장소를 공유해 보세요"
                description={
                  activeRegion === "all"
                    ? "아직 올라온 글이 없어요. 다녀온 한 곳을 짧게 남겨주세요."
                    : `'${activeRegion}' 지역의 글이 아직 없어요. 첫 글을 남겨보세요.`
                }
                cta={{
                  href: writeHref,
                  label: user ? "글 쓰기" : "로그인하고 글 쓰기",
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
