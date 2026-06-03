// 욕설 필터 [검증 ③]. 닉네임·글·댓글이 공유하는 코어.
import { BLOCKLIST } from "./blocklist";
import { normalizeForMatch } from "./normalize";

// blocklist 항목을 모듈 로드 시 1회 정규화해 둔다(입력과 동일 정규화 기준으로 비교).
const NORMALIZED = BLOCKLIST.map((raw) => ({ raw, norm: normalizeForMatch(raw) })).filter(
  (entry) => entry.norm.length > 0,
);

export function findBlockedTerms(input: string): string[] {
  const normalized = normalizeForMatch(input);
  return NORMALIZED.filter((entry) => normalized.includes(entry.norm)).map((entry) => entry.raw);
}

export function containsProfanity(input: string): boolean {
  const normalized = normalizeForMatch(input);
  return NORMALIZED.some((entry) => normalized.includes(entry.norm));
}
