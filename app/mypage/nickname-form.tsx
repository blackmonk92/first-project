"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NICKNAME_MAX, NICKNAME_MIN } from "@/lib/moderation";
import { updateNickname, type UpdateNicknameState } from "./actions";

export function NicknameForm({ currentNickname }: { currentNickname: string }) {
  const [state, formAction] = useActionState<UpdateNicknameState, FormData>(
    updateNickname,
    null,
  );

  return (
    <form action={formAction} className="grid gap-2.5">
      <Label htmlFor="nickname">닉네임</Label>
      <Input
        id="nickname"
        name="nickname"
        defaultValue={state?.value ?? currentNickname}
        minLength={NICKNAME_MIN}
        maxLength={NICKNAME_MAX}
        required
        aria-invalid={state?.error ? true : undefined}
        placeholder="2~20자, 한글·영문·숫자와 _ . 만"
      />

      {/* 검증 에러·유니크 충돌이 같은 자리에 뜬다. */}
      {state?.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-md bg-brand/10 px-3 py-2 text-sm text-brand">
          닉네임을 저장했어요.
        </p>
      )}

      <div className="flex justify-end pt-0.5">
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "저장 중…" : "저장"}
    </Button>
  );
}
