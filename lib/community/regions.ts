// 이 목록은 Supabase posts.region CHECK 제약과 1:1 동기화되어야 합니다.
// 값 추가/변경 시 마이그레이션도 함께 갱신하세요.
export const REGIONS = [
  "서울",
  "인천",
  "경기",
  "강원",
  "대전",
  "세종",
  "충북",
  "충남",
  "부산",
  "울산",
  "경북",
  "경남",
  "전북",
  "전남",
  "광주",
  "제주",
  "해외",
] as const;

export type Region = (typeof REGIONS)[number];

export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}

export function placeUrlHint(region: Region | null): string {
  if (region === "해외") {
    return "예: https://maps.app.goo.gl/... (구글맵 공유 링크)";
  }
  return "예: https://map.naver.com/... (네이버 플레이스 링크)";
}
