import type { Category } from "./categories";
import type { Region } from "./regions";

export type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  region: Region;
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
