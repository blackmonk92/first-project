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
import { cn } from "@/lib/utils";

const regions = ["서울", "경기 북부", "경기 남부", "인천", "충청권", "그 외"];

const tripTypes = [
  { value: "oneway", label: "편도" },
  { value: "roundtrip", label: "왕복" },
];

const travelTimes = [
  { value: "1h", label: "1시간" },
  { value: "1h30", label: "1시간 30분" },
  { value: "2h", label: "2시간" },
];

const companions = [
  { value: "alone", label: "혼자" },
  { value: "couple", label: "연인" },
  { value: "friend", label: "친구" },
  { value: "family", label: "가족" },
  { value: "parents", label: "부모님" },
];

const ageGroups = [
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s", label: "40대" },
  { value: "50s", label: "50대 이상" },
];

const moodOptions = [
  { value: "nature", label: "자연" },
  { value: "cafe", label: "카페" },
  { value: "food", label: "맛집" },
  { value: "exhibition", label: "전시" },
  { value: "quiet", label: "조용함" },
  { value: "photo", label: "사진" },
];

const indoorOutdoors = [
  { value: "indoor", label: "실내" },
  { value: "outdoor", label: "실외" },
  { value: "either", label: "상관없음" },
];

const planBs = [
  { value: "yes", label: "필요해요" },
  { value: "no", label: "안 받아도 OK" },
];

type Status = "idle" | "submitting" | "success" | "error";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-brand text-brand-foreground"
          : "bg-background text-foreground ring-1 ring-border hover:bg-accent/40"
      )}
    >
      {children}
    </button>
  );
}

export function WaitlistForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("");
  const [tripType, setTripType] = useState("oneway");
  const [travelTime, setTravelTime] = useState("");
  const [companion, setCompanion] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [indoorOutdoor, setIndoorOutdoor] = useState("");
  const [planB, setPlanB] = useState("");
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function toggleMood(v: string) {
    setSelectedMoods((prev) =>
      prev.includes(v) ? prev.filter((m) => m !== v) : [...prev, v]
    );
  }

  function toggleAgeGroup(v: string) {
    setSelectedAgeGroups((prev) =>
      prev.includes(v) ? prev.filter((a) => a !== v) : [...prev, v]
    );
  }

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
        body: JSON.stringify({
          email,
          region,
          tripType,
          travelTime,
          companion,
          ageGroups: selectedAgeGroups,
          moods: selectedMoods,
          indoorOutdoor,
          planB,
          place,
        }),
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
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">
            {step}/2 단계 · {step === 1 ? "핵심 조건" : "디테일 + 이메일"}
          </span>
          <span className="text-muted-foreground">
            {step === 1 ? "절반 완료" : "마지막!"}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{ width: step === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label className="text-sm font-medium">출발 지역</Label>
            <Select value={region} onValueChange={(v) => setRegion(v ?? "")}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">이동 가능 시간</Label>
            <div className="flex flex-wrap gap-2">
              {tripTypes.map((t) => (
                <Chip
                  key={t.value}
                  active={tripType === t.value}
                  onClick={() => setTripType(t.value)}
                >
                  {t.label}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {travelTimes.map((t) => (
                <Chip
                  key={t.value}
                  active={travelTime === t.value}
                  onClick={() => setTravelTime(t.value)}
                >
                  {t.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">동행자</Label>
            <div className="flex flex-wrap gap-2">
              {companions.map((c) => (
                <Chip
                  key={c.value}
                  active={companion === c.value}
                  onClick={() => setCompanion(c.value)}
                >
                  {c.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              size="lg"
              onClick={() => setStep(2)}
              className="rounded-full bg-brand px-7 text-base font-medium text-brand-foreground hover:bg-brand/90"
            >
              다음 →
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-6">
          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              연령대{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 여러 개 선택 가능
              </span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map((a) => (
                <Chip
                  key={a.value}
                  active={selectedAgeGroups.includes(a.value)}
                  onClick={() => toggleAgeGroup(a.value)}
                >
                  {a.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              분위기{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 여러 개 선택 가능
              </span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((m) => (
                <Chip
                  key={m.value}
                  active={selectedMoods.includes(m.value)}
                  onClick={() => toggleMood(m.value)}
                >
                  {m.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">실내·실외 선호</Label>
            <div className="flex flex-wrap gap-2">
              {indoorOutdoors.map((i) => (
                <Chip
                  key={i.value}
                  active={indoorOutdoor === i.value}
                  onClick={() => setIndoorOutdoor(i.value)}
                >
                  {i.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">날씨가 안 좋을 때 플랜 B</Label>
            <div className="flex flex-wrap gap-2">
              {planBs.map((p) => (
                <Chip
                  key={p.value}
                  active={planB === p.value}
                  onClick={() => setPlanB(p.value)}
                >
                  {p.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="place" className="text-sm font-medium">
              꼭 가보고 싶은 장소{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 선택
              </span>
            </Label>
            <Input
              id="place"
              placeholder="네이버 플레이스 링크 또는 장소명"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="h-11 rounded-xl bg-background"
            />
            <p className="text-xs text-muted-foreground">
              없으면 비워두셔도 코스를 추천해드려요.
            </p>
          </div>

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

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            >
              ← 이전
            </button>
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="rounded-full bg-brand px-7 text-base font-medium text-brand-foreground hover:bg-brand/90 disabled:opacity-60"
            >
              {status === "submitting" ? "신청 중…" : "신청하기"}
            </Button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        입력 정보는 출시 알림과 맞춤 코스 발송 용도로만 사용돼요. 언제든 수신 거부 가능.
      </p>
    </form>
  );
}
