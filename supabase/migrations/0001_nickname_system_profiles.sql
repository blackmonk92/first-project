-- ============================================================
-- 닉네임 제도 C1: profiles 테이블 + RLS + 자동생성 트리거 + backfill
-- ============================================================
-- 적용: 2026-06-03, Supabase MCP apply_migration (name: nickname_system_profiles)
-- project_ref: sqibtsqoastephccqtol
-- 이 repo 최초의 추적 마이그레이션 파일. 이후 DB 변경도 이 디렉터리에 박제한다.
-- (원격 DB가 source of truth. 이 파일은 git 트레이서빌리티용 기록.)
--
-- 정책 근거: docs/plan.md "단계 6 Phase 1 — 닉네임 제도 도입" 섹션
-- ============================================================

-- 1) profiles 테이블 생성
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nickname   text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) lower(nickname) 유니크 인덱스 (Travel·travel 동일 취급, 사칭 방지)
create unique index profiles_nickname_lower_key
  on public.profiles (lower(nickname));

-- 3) RLS 3정책
alter table public.profiles enable row level security;

create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);
-- DELETE 정책 없음 → 직접 삭제 불가, auth.users 삭제 시 cascade로만 정리

-- 4) gen_unique_nickname(): '여행자'+4자리, 충돌 시 재시도
create or replace function public.gen_unique_nickname()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  candidate text;
  attempts  int := 0;
begin
  loop
    candidate := '여행자' || (floor(random() * 9000) + 1000)::int::text;
    exit when not exists (
      select 1 from public.profiles where lower(nickname) = lower(candidate)
    );
    attempts := attempts + 1;
    if attempts >= 50 then
      -- 극단적 충돌 폴백: id 앞 8자리 부착으로 유일성 보장
      candidate := '여행자' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 8);
      exit;
    end if;
  end loop;
  return candidate;
end;
$$;

-- 5) handle_new_user() 트리거 + on_auth_user_created
--    신규 가입 시 profiles 행 자동 생성 (security definer → RLS 우회 insert)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, public.gen_unique_nickname());
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6) 기존 사용자 backfill (security definer 함수 경유 → RLS 우회)
--    profiles 없는 기존 auth.users 전원에게 닉네임 생성
insert into public.profiles (id, nickname)
select u.id, public.gen_unique_nickname()
from auth.users u
where not exists (
  select 1 from public.profiles p where p.id = u.id
);
