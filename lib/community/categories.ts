// posts.category CHECK 제약과 1:1 동기화. 값 추가/변경 시 마이그레이션도 함께 갱신하세요.
// post_type discriminator에 따라 허용 카테고리가 분기됩니다.
// - post_type='place'    → PLACE_CATEGORIES
// - post_type='feedback' → FEEDBACK_CATEGORIES
export const POST_TYPES = ["place", "feedback"] as const;
export type PostType = (typeof POST_TYPES)[number];

export const PLACE_CATEGORIES = [
  "맛집",
  "카페",
  "명소",
  "전시·공연",
  "자연",
  "숙소",
  "쇼핑",
] as const;

export const FEEDBACK_CATEGORIES = [
  "버그 신고",
  "개선 제안",
  "질문",
  "후기·칭찬",
] as const;

export type PlaceCategory = (typeof PLACE_CATEGORIES)[number];
export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];
export type Category = PlaceCategory | FeedbackCategory;

export function isPostType(value: unknown): value is PostType {
  return typeof value === "string" && (POST_TYPES as readonly string[]).includes(value);
}

export function isPlaceCategory(value: unknown): value is PlaceCategory {
  return (
    typeof value === "string" && (PLACE_CATEGORIES as readonly string[]).includes(value)
  );
}

export function isFeedbackCategory(value: unknown): value is FeedbackCategory {
  return (
    typeof value === "string" &&
    (FEEDBACK_CATEGORIES as readonly string[]).includes(value)
  );
}

export function categoriesFor(postType: PostType): readonly Category[] {
  return postType === "feedback" ? FEEDBACK_CATEGORIES : PLACE_CATEGORIES;
}

export function isCategoryFor(postType: PostType, value: unknown): value is Category {
  return postType === "feedback" ? isFeedbackCategory(value) : isPlaceCategory(value);
}
