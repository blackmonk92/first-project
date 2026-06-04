import { createClient } from "@/lib/supabase/server";
import { isRegion, type Region } from "@/lib/regions";
import {
  isCategoryFor,
  type Category,
  type PostType,
} from "./categories";
import {
  DEFAULT_POST_SORT,
  buildPostOrderClause,
  type PostSort,
} from "./sort";
import type { CommentWithAuthor, PostWithCounts } from "./types";

export type RegionFilter = Region | "all";
export type CategoryFilter = Category | "all";

export function parseRegionFilter(value: string | undefined | null): RegionFilter {
  if (!value || value === "all") return "all";
  return isRegion(value) ? value : "all";
}

// 카테고리 후보는 post_type별로 다르므로 어떤 영역의 필터인지 함께 받습니다.
export function parseCategoryFilter(
  value: string | undefined | null,
  postType: PostType,
): CategoryFilter {
  if (!value || value === "all") return "all";
  return isCategoryFor(postType, value) ? (value as Category) : "all";
}

export type ListPostsOptions = {
  postType?: PostType;
  region?: RegionFilter;
  category?: CategoryFilter;
  sort?: PostSort;
  limit?: number;
};

export async function listPosts(
  options: ListPostsOptions = {},
): Promise<PostWithCounts[]> {
  const {
    postType = "place",
    region = "all",
    category = "all",
    sort = DEFAULT_POST_SORT,
    limit,
  } = options;
  const supabase = await createClient();

  let query = supabase
    .from("posts_with_counts")
    .select("*")
    .eq("post_type", postType);

  if (region !== "all") {
    query = query.eq("region", region);
  }

  if (category !== "all") {
    query = query.eq("category", category);
  }

  const order = buildPostOrderClause(sort);
  query = query.order(order.column, { ascending: order.ascending });

  if (typeof limit === "number") {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to list posts: ${error.message}`);
  }
  return (data ?? []) as PostWithCounts[];
}

export async function getPost(id: string): Promise<PostWithCounts | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts_with_counts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load post: ${error.message}`);
  }
  return (data as PostWithCounts | null) ?? null;
}

export async function listComments(postId: string): Promise<CommentWithAuthor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments_with_author")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load comments: ${error.message}`);
  }
  return (data ?? []) as CommentWithAuthor[];
}

export async function hasUserLikedPost(
  postId: string,
  userId: string | null,
): Promise<boolean> {
  if (!userId) return false;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to check like state: ${error.message}`);
  }
  return data !== null;
}
