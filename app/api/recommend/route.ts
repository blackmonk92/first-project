import { NextResponse } from "next/server";

import { getCuratedPlaces } from "@/lib/curation/queries";
import { recommendRateLimiter } from "@/lib/rate-limit";
import { callOpenRouter } from "@/lib/recommend/openrouter";
import {
  SYSTEM_PROMPT,
  buildUserPrompt,
  getSeasonKst,
  getTodayKst,
} from "@/lib/recommend/prompt";
import {
  saveRecommendationRequest,
  updateRecommendationResult,
} from "@/lib/recommend/store";
import type { RecommendInput } from "@/lib/recommend/types";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

function parseInput(body: unknown): RecommendInput | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.region !== "string" || !b.region.trim()) return null;

  const stringArray = (v: unknown): string[] | undefined =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string")
      : undefined;

  return {
    region: b.region,
    regionDetail:
      typeof b.regionDetail === "string" && b.regionDetail.trim()
        ? b.regionDetail.trim()
        : undefined,
    travelTime: typeof b.travelTime === "string" ? b.travelTime : undefined,
    tripDuration:
      typeof b.tripDuration === "string" ? b.tripDuration : undefined,
    visitDay: typeof b.visitDay === "string" ? b.visitDay : undefined,
    companion: typeof b.companion === "string" ? b.companion : undefined,
    ageGroups: stringArray(b.ageGroups),
    moods: stringArray(b.moods),
    cafePreferences: stringArray(b.cafePreferences),
    indoorOutdoor:
      typeof b.indoorOutdoor === "string" ? b.indoorOutdoor : undefined,
    planB: typeof b.planB === "string" ? b.planB : undefined,
    wishPlace: typeof b.wishPlace === "string" ? b.wishPlace : undefined,
    email: typeof b.email === "string" ? b.email : undefined,
    emailOptIn: typeof b.emailOptIn === "boolean" ? b.emailOptIn : false,
  };
}

export async function POST(request: Request) {
  // 1) Rate limit
  const ip = getClientIp(request);
  const rate = await recommendRateLimiter.check(ip);
  if (!rate.ok) {
    const retryAfter = Math.ceil(rate.retryAfterMs / 1000);
    return NextResponse.json(
      {
        error: "잠시 후 다시 시도해주세요.",
        retryAfterSeconds: retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  // 2) Body 파싱
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청 형식이에요." },
      { status: 400 }
    );
  }

  const input = parseInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "필수 항목(출발 지역)을 채워주세요." },
      { status: 400 }
    );
  }

  // 3) 입력 저장 (AI 실패해도 요청 자체는 남도록 먼저 INSERT)
  let id: string;
  try {
    id = await saveRecommendationRequest(input, null);
  } catch (err) {
    console.error("Failed to save recommendation request", err);
    return NextResponse.json(
      { error: "요청 저장에 실패했어요. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }

  // 4) 큐레이션 데이터 + AI 호출
  const curated = await getCuratedPlaces({ regions: [input.region] });
  const now = new Date();
  // TODO(temp-debug): 큐레이션 카운트 확인용. 실데이터 들어오면 제거.
  console.log(
    `[recommend] region=${input.region} curated=${curated.length} season=${getSeasonKst(now)}`
  );
  const userPrompt = buildUserPrompt(input, curated, {
    today: getTodayKst(now),
    season: getSeasonKst(now),
  });

  try {
    const { result, model } = await callOpenRouter(SYSTEM_PROMPT, userPrompt);
    await updateRecommendationResult(id, result, model);
    return NextResponse.json({ id, result });
  } catch (err) {
    console.error("OpenRouter call failed", err);
    return NextResponse.json(
      {
        error: "AI 추천 생성에 실패했어요. 잠시 후 다시 시도해주세요.",
        id,
      },
      { status: 502 }
    );
  }
}
