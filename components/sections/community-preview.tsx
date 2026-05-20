import Link from "next/link";

import { PostCard } from "@/components/community/post-card";
import { PostsEmptyState } from "@/components/community/post-card-list";
import { listPosts } from "@/lib/community/queries";

export async function CommunityPreview() {
  const posts = await listPosts({ limit: 4 });

  return (
    <section
      id="community"
      className="border-t border-border/60"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            커뮤니티
          </p>
          <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            지금 사람들이 공유하는 장소
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            다녀온 곳을 짧게 공유하며 다음 주말 후보를 함께 모아요.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          {posts.length === 0 ? (
            <PostsEmptyState
              title="첫 번째 장소를 공유해 보세요"
              description="아직 올라온 글이 없어요. 다녀온 한 곳을 짧게 남겨주세요."
              cta={{ href: "/community", label: "커뮤니티 둘러보기" }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {posts.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/community"
              className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
            >
              커뮤니티 전체 보기 →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
