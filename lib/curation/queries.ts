import { CURATED_PLACES } from "./places";
import type { CuratedPlace, CuratedPlaceFilter } from "./types";

// 큐레이션 장소 조회. 현재 구현은 TS 파일(places.ts)을 인메모리로 필터링한다.
//
// 나중에 Supabase 테이블(curated_places)로 옮길 때 이 함수 내부만 교체하면
// 호출부(/api/recommend 등)는 변경 없이 그대로 동작한다.
// 교체 예시:
//   const supabase = await createClient();
//   let query = supabase.from("curated_places").select("*");
//   if (filter?.regions?.length) query = query.in("region", filter.regions);
//   if (filter?.categories?.length) query = query.in("category", filter.categories);
//   const { data, error } = await query;
//   if (error) throw new Error(`Failed to fetch curated places: ${error.message}`);
//   return data ?? [];
export async function getCuratedPlaces(
  filter?: CuratedPlaceFilter
): Promise<CuratedPlace[]> {
  // 더미 샘플은 AI 컨텍스트에 절대 흘러가지 않도록 입구에서 차단.
  // 실제 큐레이션 데이터는 "sample-" 외의 id를 쓰면 자연스럽게 통과.
  let result: CuratedPlace[] = CURATED_PLACES.filter(
    (p) => !p.id.startsWith("sample-")
  );

  if (filter?.regions?.length) {
    const regions = filter.regions;
    result = result.filter((p) => regions.includes(p.region));
  }

  if (filter?.categories?.length) {
    const categories = filter.categories;
    result = result.filter((p) => categories.includes(p.category));
  }

  return result;
}
