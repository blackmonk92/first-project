"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { deletePost } from "@/app/community/actions";

export function DeletePostButton({
  postId,
  variant = "icon",
  className,
}: {
  postId: string;
  variant?: "icon" | "text";
  className?: string;
}) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm("이 글을 삭제할까요? 되돌릴 수 없어요.")) {
          e.preventDefault();
        }
      }}
      className={cn("inline-flex", className)}
    >
      <input type="hidden" name="id" value={postId} />
      <SubmitButton variant={variant} />
    </form>
  );
}

function SubmitButton({ variant }: { variant: "icon" | "text" }) {
  const { pending } = useFormStatus();

  if (variant === "icon") {
    return (
      <button
        type="submit"
        disabled={pending}
        aria-label="글 삭제"
        className="inline-flex items-center justify-center rounded-full border border-border bg-background/95 px-2.5 py-1 text-[11px] font-medium text-muted-foreground shadow-sm transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-60"
      >
        {pending ? "삭제 중…" : "삭제"}
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive disabled:opacity-60"
    >
      {pending ? "삭제 중…" : "글 삭제"}
    </button>
  );
}
