import type { RateLimiter, RateLimitResult } from "./types";

type Bucket = { count: number; resetAt: number };

// 인메모리 fixed-window rate limiter. 단일 Next.js 인스턴스 안에서만 정확함.
// Vercel 등 다중 인스턴스 환경에선 인스턴스별로 카운터가 분리되므로
// 실제 한도가 (인스턴스 수 × limit)에 가까워질 수 있음. MVP 단계의 의도된 한계.
// 분산 정확도가 필요해지면 같은 인터페이스로 lib/rate-limit/upstash.ts를 추가해 교체.
export function createMemoryRateLimiter(opts: {
  limit: number;
  windowMs: number;
}): RateLimiter {
  const buckets = new Map<string, Bucket>();

  function sweepExpired(now: number) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  return {
    async check(key: string): Promise<RateLimitResult> {
      const now = Date.now();
      // 메모리 누수 방지: 1% 확률로 만료된 버킷 청소
      if (Math.random() < 0.01) sweepExpired(now);

      const bucket = buckets.get(key);
      if (!bucket || now >= bucket.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
        return { ok: true };
      }
      if (bucket.count >= opts.limit) {
        return { ok: false, retryAfterMs: bucket.resetAt - now };
      }
      bucket.count += 1;
      return { ok: true };
    },
  };
}
