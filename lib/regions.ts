// 17개 지역 목록. 다음 두 영역에서 공통으로 사용됩니다.
// - community: Supabase posts.region CHECK 제약과 1:1 동기화되어야 함
// - recommend: /api/recommend의 region 입력 옵션
// 값 추가/변경 시 community 쪽 Supabase 마이그레이션도 함께 갱신하세요.
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
  return (
    typeof value === "string" && (REGIONS as readonly string[]).includes(value)
  );
}

// 추천 폼에서 임시로 비활성화된 지역. 커뮤니티는 영향 받지 않습니다.
// "해외"는 추후 구글맵 링크 등 별도 처리가 필요해 1차 공개에서는 제외.
export const RECOMMEND_DISABLED_REGIONS: ReadonlySet<string> = new Set([
  "해외",
]);

export function isRecommendDisabled(region: string): boolean {
  return RECOMMEND_DISABLED_REGIONS.has(region);
}
