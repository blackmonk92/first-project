// 정렬 기준을 한 곳에서만 바꿀 수 있게 분리.
// MVP는 'latest' 고정. 글이 쌓이면 'popular_mixed'로 교체.
export type PostSort = "latest" | "popular_mixed";

export const DEFAULT_POST_SORT: PostSort = "latest";

export type OrderClause = { column: string; ascending: boolean };

export function buildPostOrderClause(sort: PostSort): OrderClause {
  switch (sort) {
    case "latest":
      return { column: "created_at", ascending: false };
    case "popular_mixed":
      // TODO: like_count*2 + recency 같은 혼합 점수는 SQL 함수/RPC로 빼는 게 깔끔.
      return { column: "created_at", ascending: false };
  }
}
