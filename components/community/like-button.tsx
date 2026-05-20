"use client";

import Link from "next/link";
import { useOptimistic } from "react";

import { cn } from "@/lib/utils";
import { toggleLike } from "@/app/community/actions";

type LikeState = { liked: boolean; count: number };

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
  authed,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
  authed: boolean;
}) {
  const [optimistic, setOptimistic] = useOptimistic<LikeState, void>(
    { liked: initialLiked, count: initialCount },
    (state) => ({
      liked: !state.liked,
      count: state.liked ? state.count - 1 : state.count + 1,
    }),
  );

  if (!authed) {
    return (
      <Link
        href="/login"
        aria-label="로그인하고 좋아요"
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
      >
        <span aria-hidden>♡</span>
        <span>{initialCount}</span>
      </Link>
    );
  }

  return (
    <form
      action={async (formData) => {
        setOptimistic();
        await toggleLike(formData);
      }}
    >
      <input type="hidden" name="post_id" value={postId} />
      <button
        type="submit"
        aria-pressed={optimistic.liked}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          optimistic.liked
            ? "border-brand bg-brand/10 text-brand"
            : "border-border bg-background text-muted-foreground hover:border-brand/60 hover:text-foreground",
        )}
      >
        <span aria-hidden>{optimistic.liked ? "♥" : "♡"}</span>
        <span>{optimistic.count}</span>
      </button>
    </form>
  );
}
