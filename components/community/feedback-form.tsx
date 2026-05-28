"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FEEDBACK_CATEGORIES,
  isFeedbackCategory,
  type FeedbackCategory,
} from "@/lib/community/categories";
import { createFeedback, type CreateFeedbackState } from "@/app/community/actions";

export function FeedbackForm() {
  const [state, formAction] = useActionState<CreateFeedbackState, FormData>(
    createFeedback,
    null,
  );

  const initialCategory: FeedbackCategory | "" =
    state?.values?.category && isFeedbackCategory(state.values.category)
      ? state.values.category
      : "";

  const [category, setCategory] = useState<FeedbackCategory | "">(initialCategory);

  useEffect(() => {
    if (state?.values?.category && isFeedbackCategory(state.values.category)) {
      setCategory(state.values.category);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-border bg-card p-6 sm:p-7"
    >
      <div className="grid gap-5">
        <div className="grid gap-1.5">
          <Label htmlFor="category">
            의견 종류 <span className="text-brand">*</span>
          </Label>
          <input type="hidden" name="category" value={category} />
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as FeedbackCategory)}
          >
            <SelectTrigger id="category" className="h-11 rounded-xl bg-background">
              <SelectValue placeholder="의견 종류를 선택해주세요" />
            </SelectTrigger>
            <SelectContent>
              {FEEDBACK_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="title">
            제목 <span className="text-brand">*</span>
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            maxLength={80}
            required
            defaultValue={state?.values?.title ?? ""}
            placeholder="한 줄로 요약해주세요"
            className="h-11 rounded-xl bg-background"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="content">
            내용 <span className="text-brand">*</span>
          </Label>
          <textarea
            id="content"
            name="content"
            required
            maxLength={1000}
            rows={6}
            defaultValue={state?.values?.content ?? ""}
            placeholder="어떤 점이 불편했는지, 무엇이 더 있으면 좋을지 자유롭게 적어주세요."
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-relaxed shadow-xs outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        {state?.error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.error}
          </p>
        )}

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
      className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "올리는 중…" : "의견 남기기"}
    </button>
  );
}
