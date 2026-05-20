"use client";

import { useFormStatus } from "react-dom";

import { deleteComment } from "@/app/community/actions";

export function DeleteCommentButton({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) {
  return (
    <form
      action={deleteComment}
      onSubmit={(e) => {
        if (!confirm("이 댓글을 삭제할까요?")) e.preventDefault();
      }}
      className="inline-flex"
    >
      <input type="hidden" name="id" value={commentId} />
      <input type="hidden" name="post_id" value={postId} />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-destructive disabled:opacity-60"
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}
