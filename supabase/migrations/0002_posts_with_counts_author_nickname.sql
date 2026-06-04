-- C3: posts_with_counts 작성자 표시를 이메일 → 닉네임으로 교체.
-- author_email(auth.users.email) 제거, profiles inner JOIN으로 author_nickname 노출.
-- 이름·타입이 모두 바뀌므로 CREATE OR REPLACE 불가 → DROP 후 재생성.
-- inner JOIN 근거: posts.user_id의 profiles 미매칭 0건(C1 backfill+트리거).
DROP VIEW IF EXISTS public.posts_with_counts;

CREATE VIEW public.posts_with_counts AS
SELECT p.id,
       p.user_id,
       p.title,
       p.content,
       p.region,
       p.category,
       p.place_name,
       p.place_url,
       p.created_at,
       pr.nickname AS author_nickname,
       (SELECT count(*) FROM likes l    WHERE l.post_id = p.id) AS like_count,
       (SELECT count(*) FROM comments c WHERE c.post_id = p.id) AS comment_count,
       p.post_type
FROM posts p
JOIN profiles pr ON pr.id = p.user_id;
