// 이 목록은 Supabase posts.category CHECK 제약과 1:1 동기화되어야 합니다.
// 값 추가/변경 시 마이그레이션도 함께 갱신하세요.
export const CATEGORIES = [
  "맛집",
  "카페",
  "명소",
  "전시·공연",
  "자연",
  "숙소",
  "쇼핑",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (CATEGORIES as readonly string[]).includes(value);
}
