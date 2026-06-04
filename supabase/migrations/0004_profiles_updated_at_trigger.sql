-- C4: profiles.updated_at 자동 갱신 트리거.
-- C1에서 updated_at은 default now()만 있고 ON UPDATE 갱신이 없어 C4 스코프로 미뤄둔 것.
-- moddatetime 확장 의존 없이 자체 함수로 처리(0001의 security definer 함수 스타일과 일관).
-- set_updated_at()는 범용 함수라 향후 다른 테이블 트리거에도 재사용 가능.
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
