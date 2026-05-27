import { createMemoryRateLimiter } from "./memory";

export type { RateLimiter, RateLimitResult } from "./types";

// 추천 라우트용 rate limiter: IP당 분당 5회.
// 정상 사용자는 보통 1~2회 재시도 수준이므로 5회면 정상 사용은 막지 않고
// 자동화된 봇만 차단하는 효과.
// 본격적인 공격 패턴이 보이면 Upstash 기반으로 교체 (lib/rate-limit/upstash.ts).
export const recommendRateLimiter = createMemoryRateLimiter({
  limit: 5,
  windowMs: 60_000,
});
