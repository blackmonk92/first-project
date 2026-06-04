-- C3: comments_with_author 작성자 표시를 이메일 → 닉네임으로 교체.
-- author_email(auth.users.email) 제거, profiles inner JOIN으로 author_nickname 노출.
-- inner JOIN 근거: comments.user_id의 profiles 미매칭 0건(C1 backfill+트리거).
DROP VIEW IF EXISTS public.comments_with_author;

CREATE VIEW public.comments_with_author AS
SELECT c.id,
       c.post_id,
       c.user_id,
       c.content,
       c.created_at,
       pr.nickname AS author_nickname
FROM comments c
JOIN profiles pr ON pr.id = c.user_id;
