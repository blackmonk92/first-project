export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterMs: number };

export type RateLimiter = {
  check(key: string): Promise<RateLimitResult>;
};
