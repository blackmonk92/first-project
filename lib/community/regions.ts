import type { Region } from "@/lib/regions";

// REGIONS, Region, isRegion은 @/lib/regions로 이동했습니다.
// 이 파일에는 community 도메인 특화 헬퍼만 남깁니다.

export function placeUrlHint(region: Region | null): string {
  if (region === "해외") {
    return "예: https://maps.app.goo.gl/... (구글맵 공유 링크)";
  }
  return "예: https://map.naver.com/... (네이버 플레이스 링크)";
}
