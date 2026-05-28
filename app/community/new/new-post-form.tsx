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
import { REGIONS, isRegion, type Region } from "@/lib/regions";
import { placeUrlHint } from "@/lib/community/regions";
import {
  PLACE_CATEGORIES,
  isPlaceCategory,
  type PlaceCategory,
} from "@/lib/community/categories";
import { createPost, type CreatePostState } from "@/app/community/actions";

export function NewPostForm() {
  const [state, formAction] = useActionState<CreatePostState, FormData>(
    createPost,
    null,
  );

  // Select는 컨트롤드 — 에러 후 사용자가 선택했던 값을 복원한다.
  const initialRegion: Region | "" =
    state?.values?.region && isRegion(state.values.region)
      ? state.values.region
      : "";
  const initialCategory: PlaceCategory | "" =
    state?.values?.category && isPlaceCategory(state.values.category)
      ? state.values.category
      : "";

  const [region, setRegion] = useState<Region | "">(initialRegion);
  const [category, setCategory] = useState<PlaceCategory | "">(initialCategory);

  useEffect(() => {
    if (state?.values?.region && isRegion(state.values.region)) {
      setRegion(state.values.region);
    }
    if (state?.values?.category && isPlaceCategory(state.values.category)) {
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
            placeholder="어디 다녀오셨나요?"
            className="h-11 rounded-xl bg-background"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="region">
              지역 <span className="text-brand">*</span>
            </Label>
            <input type="hidden" name="region" value={region} />
            <Select
              value={region}
              onValueChange={(v) => setRegion(v as Region)}
            >
              <SelectTrigger
                id="region"
                className="h-11 rounded-xl bg-background"
              >
                <SelectValue placeholder="지역을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="category">
              장소 구분 <span className="text-brand">*</span>
            </Label>
            <input type="hidden" name="category" value={category} />
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as PlaceCategory)}
            >
              <SelectTrigger
                id="category"
                className="h-11 rounded-xl bg-background"
              >
                <SelectValue placeholder="장소 구분을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {PLACE_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
            placeholder="어떤 곳이었는지, 어떤 점이 좋았는지 짧게 적어주세요."
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm leading-relaxed shadow-xs outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="place_name">
            장소명{" "}
            <span className="text-xs font-normal text-muted-foreground">
              · 선택
            </span>
          </Label>
          <Input
            id="place_name"
            name="place_name"
            type="text"
            defaultValue={state?.values?.placeName ?? ""}
            placeholder="예: 파주 출판도시 지혜의숲"
            className="h-11 rounded-xl bg-background"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="place_url">
            장소 링크{" "}
            <span className="text-xs font-normal text-muted-foreground">
              · 선택
            </span>
          </Label>
          <Input
            id="place_url"
            name="place_url"
            type="url"
            defaultValue={state?.values?.placeUrl ?? ""}
            placeholder={
              region ? placeUrlHint(region as Region) : "지역을 먼저 선택해주세요"
            }
            className="h-11 rounded-xl bg-background"
          />
          <p className="text-xs text-muted-foreground">
            {region === "해외"
              ? "해외 장소는 구글맵 공유 링크를 권장해요."
              : "국내 장소는 네이버 플레이스 링크를 권장해요."}
          </p>
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
      {pending ? "올리는 중…" : "글 올리기"}
    </button>
  );
}
