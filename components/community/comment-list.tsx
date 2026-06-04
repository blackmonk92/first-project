import { DeleteCommentButton } from "@/components/community/delete-comment-button";
import type { CommentWithAuthor } from "@/lib/community/types";

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

export function CommentList({
  comments,
  postId,
  currentUserId,
}: {
  comments: CommentWithAuthor[];
  postId: string;
  currentUserId: string | null;
}) {
  if (comments.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border/60 bg-card/40 px-4 py-6 text-center text-sm text-muted-foreground">
        아직 댓글이 없어요. 첫 댓글을 남겨주세요.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border/60">
      {comments.map((c) => {
        const canDelete = !!currentUserId && currentUserId === c.user_id;
        return (
          <li key={c.id} className="py-4">
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span className="truncate">
                <span className="font-medium text-foreground">
                  {c.author_nickname}
                </span>
                <span className="ml-2">{formatRelative(c.created_at)}</span>
              </span>
              {canDelete && (
                <DeleteCommentButton commentId={c.id} postId={postId} />
              )}
            </div>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {c.content}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
