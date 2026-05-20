"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  createComment,
  type CreateCommentState,
} from "@/app/community/actions";

export function CommentForm({
  postId,
  authed,
}: {
  postId: string;
  authed: boolean;
}) {
  const [state, formAction] = useActionState<CreateCommentState, FormData>(
    createComment,
    null,
  );

  if (!authed) {
    return (
      <div className="rounded-2xl border border-dashed border-border/70 bg-card/40 px-4 py-4 text-sm text-muted-foreground">
        댓글을 남기려면{" "}
        <Link href="/login" className="font-medium text-brand hover:underline">
          로그인
        </Link>
        이 필요해요.
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-2.5">
      <input type="hidden" name="post_id" value={postId} />
      <textarea
        name="content"
        rows={3}
        maxLength={500}
        required
        defaultValue={state?.values?.content ?? ""}
        placeholder="이 장소에 대한 한 마디를 남겨주세요"
        className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-relaxed shadow-xs outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "올리는 중…" : "댓글 달기"}
    </button>
  );
}
