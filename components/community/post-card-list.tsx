import Link from "next/link";
import type { ReactNode } from "react";

import { PostCard } from "@/components/community/post-card";
import type { PostWithCounts } from "@/lib/community/types";

type EmptyStateProps = {
  title: string;
  description: ReactNode;
  cta?: { href: string; label: string };
};

export function PostsEmptyState({ title, description, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border/70 bg-card/40 px-6 py-14 text-center">
      <p className="text-2xl">🌱</p>
      <p className="text-base font-semibold tracking-tight">{title}</p>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-2 inline-flex items-center rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-opacity hover:opacity-90"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export function PostCardGrid({
  posts,
  currentUserId = null,
}: {
  posts: PostWithCounts[];
  currentUserId?: string | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          canDelete={!!currentUserId && currentUserId === post.user_id}
        />
      ))}
    </div>
  );
}
