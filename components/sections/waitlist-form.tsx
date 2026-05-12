"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departureRegions = [
  "서울",
  "경기 북부",
  "경기 남부",
  "인천",
  "충청권",
  "그 외",
];

const courseTypes = [
  { value: "drive", label: "드라이브 위주" },
  { value: "cafe", label: "감성 카페 투어" },
  { value: "nature", label: "자연 힐링" },
  { value: "indoor", label: "실내·전시 중심" },
  { value: "food", label: "맛집 중심" },
];

const moods = [
  { value: "calm", label: "조용히 쉬는 분위기" },
  { value: "active", label: "걷고 움직이는 분위기" },
  { value: "romantic", label: "감성적인 분위기" },
  { value: "fun", label: "왁자지껄 즐거운 분위기" },
];

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [courseType, setCourseType] = useState("");
  const [mood, setMood] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("올바른 이메일을 입력해 주세요.");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, region, courseType, mood }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("잠시 후 다시 시도해 주세요.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight">
          신청이 완료됐어요
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          출시 전 베타에 가장 먼저 초대드릴게요.
          <br />
          가장 가까운 토요일 아침, 맞춤 코스 한 개를 미리 보내드립니다.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 sm:p-7 md:p-10"
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            이메일 <span className="text-brand">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-xl bg-background"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="grid gap-2">
            <Label className="text-sm font-medium">출발 지역</Label>
            <Select value={region} onValueChange={(v) => setRegion(v ?? "")}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {departureRegions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">관심 코스 유형</Label>
            <Select
              value={courseType}
              onValueChange={(v) => setCourseType(v ?? "")}
            >
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {courseTypes.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">선호 분위기</Label>
            <Select value={mood} onValueChange={(v) => setMood(v ?? "")}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            입력하신 정보는 출시 알림과 맞춤 코스 발송 용도로만 사용돼요.
            <br className="hidden md:block" />
            언제든 한 번의 클릭으로 수신 거부할 수 있어요.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="rounded-full bg-brand px-7 text-base font-medium text-brand-foreground hover:bg-brand/90 disabled:opacity-60"
          >
            {status === "submitting" ? "신청 중…" : "출시 알림 신청하기"}
          </Button>
        </div>
      </div>
    </form>
  );
}
