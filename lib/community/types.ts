import type { Category, PostType } from "./categories";
import type { Region } from "@/lib/regions";

export type Post = {
  id: string;
  user_id: string;
  post_type: PostType;
  title: string;
  content: string;
  // 의견(feedback) 글은 지역이 없으므로 nullable.
  region: Region | null;
  category: Category;
  place_name: string | null;
  place_url: string | null;
  created_at: string;
};

export type PostWithCounts = Post & {
  author_email: string;
  like_count: number;
  comment_count: number;
};

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type CommentWithAuthor = Comment & {
  author_email: string;
};
