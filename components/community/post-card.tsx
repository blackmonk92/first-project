import Link from "next/link";

import { RegionTag } from "@/components/community/region-tag";
import { CategoryTag } from "@/components/community/category-tag";
import { DeletePostButton } from "@/components/community/delete-post-button";
import { maskAuthor } from "@/lib/community/queries";
import type { PostWithCounts } from "@/lib/community/types";

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.round((now - then) / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `${diffH}시간 전`;
  const diffD = Math.round(diffH / 24);
  if (diffD < 7) return `${diffD}일 전`;
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function excerpt(text: string, max = 110): string {
  const trimmed = text.trim().replace(/\s+/g, " ");
  return trimmed.length > max ? `${trimmed.slice(0, max)}…` : trimmed;
}

export function PostCard({
  post,
  canDelete = false,
}: {
  post: PostWithCounts;
  canDelete?: boolean;
}) {
  return (
    <article className="group relative">
      <Link
        href={`/community/${post.id}`}
        className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-background p-5 shadow-sm transition-colors hover:border-brand/60 sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-2">
          <RegionTag region={post.region} />
          <CategoryTag category={post.category} />
          <span className="text-xs text-muted-foreground">
            {formatRelative(post.created_at)}
          </span>
        </div>
        <h3 className="text-base font-semibold leading-snug tracking-tight group-hover:text-brand sm:text-lg">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {excerpt(post.content)}
        </p>
        {post.place_name && (
          <p className="truncate text-xs text-muted-foreground">
            <span className="font-medium text-foreground">장소 · </span>
            {post.place_name}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
          <span className="truncate">{maskAuthor(post.author_email)}</span>
          <span className="flex items-center gap-3">
            <span>♥ {post.like_count}</span>
            <span>💬 {post.comment_count}</span>
          </span>
        </div>
      </Link>
      {canDelete && (
        <DeletePostButton
          postId={post.id}
          className="absolute top-3 right-3 z-10"
        />
      )}
    </article>
  );
}
