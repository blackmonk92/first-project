"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
import { REGIONS, isRecommendDisabled } from "@/lib/regions";
import { cn } from "@/lib/utils";

// 옵션 값은 라벨과 동일(한글). AI 프롬프트에 그대로 전달돼 의미 해석이 직관적.
const TRAVEL_TIMES = [
  "왕복 2시간",
  "왕복 3시간",
  "왕복 4시간",
  "왕복 5시간",
] as const;
const COMPANIONS = ["혼자", "연인", "친구", "가족", "부모님"] as const;
const AGE_GROUPS = ["20대", "30대", "40대", "50대 이상"] as const;
const MOODS = ["자연", "카페", "맛집", "전시", "조용함", "사진"] as const;
const CAFE_PREFERENCES = [
  "커피 맛 (로스터리, 시그니처 메뉴)",
  "분위기·사진 (인테리어, 뷰)",
] as const;
const INDOOR_OUTDOORS = ["실내", "실외", "상관없음"] as const;
const PLAN_BS = ["필요해요", "안 받아도 OK"] as const;

const TRIP_DURATIONS = [
  { value: "3~4시간 (짧게)", disabled: false },
  { value: "5~6시간 (반나절)", disabled: false },
  { value: "7~9시간 (하루 종일)", disabled: false },
  { value: "1박 2일", disabled: true },
] as const;
const VISIT_DAYS = ["평일", "주말"] as const;

type Status = "idle" | "submitting" | "error";

function Chip({
  active,
  onClick,
  disabled,
  children,
}: {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        disabled
          ? "cursor-not-allowed bg-background text-muted-foreground/60 opacity-60 ring-1 ring-border"
          : active
            ? "bg-brand text-brand-foreground"
            : "bg-background text-foreground ring-1 ring-border hover:bg-accent/40"
      )}
    >
      {children}
    </button>
  );
}

// AI 호출은 보통 30~50초 걸려서 진행 바 + 단계 메시지로 사용자 안심.
// ease-out 곡선: 5초≈24%, 15초≈57%, 30초≈80%, 50초≈94%.
function ProgressView({ done }: { done: boolean }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (done) return;
    const startedAt = Date.now();
    const interval = setInterval(() => {
      setElapsed((Date.now() - startedAt) / 1000);
    }, 100);
    return () => clearInterval(interval);
  }, [done]);

  const baseProgress = Math.min(95, 95 * (1 - Math.exp(-elapsed / 18)));
  const progress = done ? 100 : baseProgress;

  let message: string;
  if (done) message = "코스가 도착했어요! 잠시 후 결과 화면으로 이동할게요.";
  else if (elapsed < 15) message = "당신의 조건을 분석하고 있어요...";
  else if (elapsed < 35) message = "딱 맞는 장소를 고르고 있어요...";
  else if (elapsed < 50) message = "코스를 짜고 있어요... 거의 다 왔어요!";
  else message = "조금만 더 기다려주세요...";

  return (
    <div className="flex flex-col items-center gap-5 py-12">
      <div className="w-full max-w-md">
        <div className="h-2 w-full overflow-hidden rounded-full bg-accent">
          <div
            className="h-full bg-brand transition-[width] duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs tabular-nums text-muted-foreground">
          {Math.round(progress)}%
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function RecommendForm() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);

  // Step 1
  const [region, setRegion] = useState("");
  const [regionDetail, setRegionDetail] = useState("");
  const [travelTime, setTravelTime] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [visitDay, setVisitDay] = useState("");
  const [companion, setCompanion] = useState("");

  // Step 2
  const [ageGroups, setAgeGroups] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [cafePreferences, setCafePreferences] = useState<string[]>([]);
  const [indoorOutdoor, setIndoorOutdoor] = useState("");
  const [planB, setPlanB] = useState("");
  const [wishPlace, setWishPlace] = useState("");
  const [email, setEmail] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(false);

  // Status
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function toggleArrayItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) {
    setter((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]
    );
  }

  function handleNextFromStep1() {
    if (!region) {
      setError("출발 지역을 선택해 주세요.");
      return;
    }
    if (!tripDuration) {
      setError("하루에 얼마나 다녀오고 싶은지 선택해 주세요.");
      return;
    }
    if (!visitDay) {
      setError("언제 가실 예정인지 선택해 주세요.");
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!region) {
      setError("출발 지역을 선택해 주세요.");
      setStep(1);
      return;
    }
    if (!tripDuration) {
      setError("하루에 얼마나 다녀오고 싶은지 선택해 주세요.");
      setStep(1);
      return;
    }
    if (!visitDay) {
      setError("언제 가실 예정인지 선택해 주세요.");
      setStep(1);
      return;
    }
    if (email && !email.includes("@")) {
      setError("올바른 이메일을 입력해 주세요.");
      return;
    }

    setError(null);
    setDone(false);
    setStatus("submitting");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          regionDetail: regionDetail.trim() || undefined,
          travelTime: travelTime || undefined,
          tripDuration,
          visitDay,
          companion: companion || undefined,
          ageGroups,
          moods,
          cafePreferences,
          indoorOutdoor: indoorOutdoor || undefined,
          planB: planB || undefined,
          wishPlace: wishPlace.trim() || undefined,
          email: email.trim() || undefined,
          emailOptIn,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { id?: string; error?: string; retryAfterSeconds?: number }
        | null;

      if (!res.ok) {
        if (res.status === 429) {
          const sec = data?.retryAfterSeconds ?? 60;
          throw new Error(
            `잠시 후 다시 시도해주세요. (${sec}초 후 다시 가능)`
          );
        }
        throw new Error(data?.error ?? "일시적인 오류가 발생했어요.");
      }

      if (!data?.id) {
        throw new Error("응답 형식이 올바르지 않아요.");
      }

      setDone(true);
      // 진행 바가 100%로 채워지는 짧은 트랜지션 후 결과 페이지로 이동
      setTimeout(() => {
        router.push(`/r/${data.id}`);
      }, 350);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "일시적인 오류가 발생했어요."
      );
    }
  }

  if (status === "submitting") {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 md:p-10">
        <ProgressView done={done} />
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
            <Label className="text-sm font-medium">
              출발 지역 <span className="text-brand">*</span>
            </Label>
            <Select value={region} onValueChange={(v) => setRegion(v ?? "")}>
              <SelectTrigger className="h-11 rounded-xl bg-background">
                <SelectValue placeholder="선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => {
                  const disabled = isRecommendDisabled(r);
                  return (
                    <SelectItem key={r} value={r} disabled={disabled}>
                      <span>{r}</span>
                      {disabled && (
                        <span className="ml-auto rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                          곧 공개
                        </span>
                      )}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="regionDetail" className="text-sm font-medium">
              더 정확한 출발지{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 선택
              </span>
            </Label>
            <Input
              id="regionDetail"
              placeholder="강남구, 마포구, 분당, 일산처럼 더 정확한 출발지를 알려주세요 (선택)"
              value={regionDetail}
              onChange={(e) => setRegionDetail(e.target.value)}
              className="h-11 rounded-xl bg-background"
            />
            <p className="text-xs text-muted-foreground">
              비워두면 광역만 보고 일반적인 도심·근교 동선으로 추천해 드려요.
            </p>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              운전 부담을 감당할 수 있는 시간
            </Label>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_TIMES.map((t) => (
                <Chip
                  key={t}
                  active={travelTime === t}
                  onClick={() => setTravelTime(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              하루에 얼마나 다녀오고 싶어요?{" "}
              <span className="text-brand">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {TRIP_DURATIONS.map((d) => (
                <Chip
                  key={d.value}
                  active={tripDuration === d.value}
                  disabled={d.disabled}
                  onClick={() => setTripDuration(d.value)}
                >
                  {d.value}
                  {d.disabled && (
                    <span className="ml-1.5 inline-block rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                      Coming soon
                    </span>
                  )}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              언제 가실 예정이에요? <span className="text-brand">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {VISIT_DAYS.map((d) => (
                <Chip
                  key={d}
                  active={visitDay === d}
                  onClick={() => setVisitDay(d)}
                >
                  {d}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">동행자</Label>
            <div className="flex flex-wrap gap-2">
              {COMPANIONS.map((c) => (
                <Chip
                  key={c}
                  active={companion === c}
                  onClick={() => setCompanion(c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              size="lg"
              onClick={handleNextFromStep1}
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
              {AGE_GROUPS.map((a) => (
                <Chip
                  key={a}
                  active={ageGroups.includes(a)}
                  onClick={() => toggleArrayItem(setAgeGroups, a)}
                >
                  {a}
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
              {MOODS.map((m) => (
                <Chip
                  key={m}
                  active={moods.includes(m)}
                  onClick={() => toggleArrayItem(setMoods, m)}
                >
                  {m}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              카페 취향{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 여러 개 선택 가능
              </span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {CAFE_PREFERENCES.map((c) => (
                <Chip
                  key={c}
                  active={cafePreferences.includes(c)}
                  onClick={() => toggleArrayItem(setCafePreferences, c)}
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">실내·실외 선호</Label>
            <div className="flex flex-wrap gap-2">
              {INDOOR_OUTDOORS.map((i) => (
                <Chip
                  key={i}
                  active={indoorOutdoor === i}
                  onClick={() => setIndoorOutdoor(i)}
                >
                  {i}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2.5">
            <Label className="text-sm font-medium">
              날씨가 안 좋을 때 플랜 B
            </Label>
            <div className="flex flex-wrap gap-2">
              {PLAN_BS.map((p) => (
                <Chip
                  key={p}
                  active={planB === p}
                  onClick={() => setPlanB(p)}
                >
                  {p}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="wishPlace" className="text-sm font-medium">
              꼭 가보고 싶은 장소{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 선택
              </span>
            </Label>
            <Input
              id="wishPlace"
              placeholder="가고 싶은 장소 이름 (예: 성수동 어니언 카페)"
              value={wishPlace}
              onChange={(e) => setWishPlace(e.target.value)}
              className="h-11 rounded-xl bg-background"
            />
            <p className="text-xs text-muted-foreground">
              없으면 비워두셔도 코스를 추천해드려요. 정확한 가게명과 지역을
              함께 적어주시면 더 잘 잡혀요.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">
              이메일{" "}
              <span className="text-xs font-normal text-muted-foreground">
                · 선택
              </span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl bg-background"
            />
            <label className="mt-1 flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={emailOptIn}
                onChange={(e) => setEmailOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 cursor-pointer rounded accent-[oklch(0.72_0.12_45)]"
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                결과를 이메일로도 받기{" "}
                <span className="text-muted-foreground/80">
                  (지금은 손만 들어두는 단계예요 — 발송이 열리면 가장 먼저
                  알려드릴게요.)
                </span>
              </span>
            </label>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="inline-flex h-12 items-center justify-center rounded-full px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
            >
              ← 이전
            </button>
            <Button
              type="submit"
              size="lg"
              className="rounded-full bg-brand px-7 text-base font-medium text-brand-foreground hover:bg-brand/90"
            >
              추천 받기
            </Button>
          </div>
        </div>
      )}

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        입력 정보는 추천 결과 생성과 향후 이메일 발송(준비 중) 외에 사용되지 않아요.
      </p>
    </form>
  );
}
