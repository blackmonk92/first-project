import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { RegionTag } from "@/components/community/region-tag";
import { CategoryTag } from "@/components/community/category-tag";
import { DeletePostButton } from "@/components/community/delete-post-button";
import { LikeButton } from "@/components/community/like-button";
import { CommentForm } from "@/components/community/comment-form";
import { CommentList } from "@/components/community/comment-list";
import {
  getPost,
  hasUserLikedPost,
  listComments,
} from "@/lib/community/queries";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function CommunityPostPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [comments, liked] = await Promise.all([
    listComments(id),
    hasUserLikedPost(id, user?.id ?? null),
  ]);

  const canDeletePost = !!user && user.id === post.user_id;
  const isFeedback = post.post_type === "feedback";
  const backHref = isFeedback ? "/community/feedback" : "/community";
  const backLabel = isFeedback ? "← 의견 모음으로" : "← 커뮤니티로";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-14 md:py-20">
          <Link
            href={backHref}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {backLabel}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <RegionTag region={post.region} />
            <CategoryTag category={post.category} />
            <span className="text-xs text-muted-foreground">
              {new Date(post.created_at).toLocaleString("ko-KR")}
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              {post.title}
            </h1>
            {canDeletePost && (
              <DeletePostButton postId={post.id} variant="text" />
            )}
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            {post.author_nickname}
          </p>

          <div className="mt-8 whitespace-pre-line text-base leading-relaxed text-foreground">
            {post.content}
          </div>

          {(post.place_name || post.place_url) && (
            <div className="mt-8 rounded-2xl border border-border bg-card/50 p-4 text-sm">
              {post.place_name && (
                <p>
                  <span className="font-semibold">장소 · </span>
                  <span className="text-muted-foreground">{post.place_name}</span>
                </p>
              )}
              {post.place_url && (
                <a
                  href={post.place_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent/50"
                >
                  지도 보기 →
                </a>
              )}
            </div>
          )}

          <div className="mt-12 flex items-center gap-3">
            <LikeButton
              postId={post.id}
              initialLiked={liked}
              initialCount={post.like_count}
              authed={!!user}
            />
            <span className="text-sm text-muted-foreground">
              💬 {post.comment_count}
            </span>
          </div>

          <section className="mt-12">
            <h2 className="text-base font-semibold tracking-tight">
              댓글 {post.comment_count}
            </h2>
            <div className="mt-4">
              <CommentList
                comments={comments}
                postId={post.id}
                currentUserId={user?.id ?? null}
              />
            </div>
            <div className="mt-6">
              <CommentForm postId={post.id} authed={!!user} />
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
