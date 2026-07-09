# CLAUDE.md

"오늘 어디 갈래?" — 주말 근교 코스를 추천하는 AI 큐레이션 서비스 (수요 검증용 MVP).
상세 기획·아키텍처 결정·작업 일지는 **`docs/plan.md`** 참조. 이 파일엔 코드·git이 말해주지 않는 것만 담는다.

## ⚠️ 환경 함정 (제일 먼저 읽을 것)

- **Windows: `npm`/`npx` 직접 호출이 실행 정책에 막힌다.** 항상 `.cmd` 접미사를 붙여라 → `npm.cmd run dev`, `npx.cmd shadcn ...`.
- **한국어 OneDrive 경로 + git author 인코딩 깨짐.** git이 author를 자동감지하면 한글 경로 탓에 깨진다. 커밋 전 `--local`로 명시할 것:
  - `git config --local user.name blackmonk92`
  - `git config --local user.email <계정 이메일>`
  - GitHub 계정: **blackmonk92**

## 작업 규칙

- **DB 변경은 반드시 `supabase/migrations/`에 마이그레이션 파일로 박제한다** (현재 `0001`~`0004`). 인라인 DDL로 끝내지 말 것.
- **Supabase DDL 적용 전, SQL과 RLS 의도를 먼저 보여주고 승인받는다.** `apply_migration`/`execute_sql`은 라이브 프로젝트에 바로 영향 → 진입 전 `list_tables` 등으로 현재 상태부터 확인.
- **커밋은 코드 + `docs/plan.md`(작업 일지)를 함께** 묶는다. push는 요청받았을 때만, 신중히.
- **샘플/더미 데이터는 명백히 가짜로.** "샘플 카페 1" 같은 라벨 + "(샘플 데이터 - 교체 필요)" 마커. 실존 상호·이름 도용 금지.

## 스택 · 구조

- **스택**: Next.js 16 (App Router) · React 19 · Tailwind v4 · shadcn · Supabase (`@supabase/ssr`) · OpenRouter (AI 추천)
- **구조**:
  - `app/` — `api`(recommend·waitlist) · `auth` · `community` · `mypage` · `signup` · `r`(공유 결과 페이지)
  - `lib/` — `curation` · `moderation` · `recommend` · `rate-limit` · `supabase` · `regions.ts`
  - `components/` — `sections` · `community` · `ui`
  - `supabase/migrations/` — DB 스키마 박제
- **명령어** (앞의 `.cmd` 규칙 유의): `npm.cmd run dev` · `build` · `lint` · `test`(vitest)

## 핵심 아키텍처 결정 (요약 — 상세는 `docs/plan.md`)

- **닉네임 제도**: `profiles` 테이블 + RLS(본인만 수정). 글·댓글은 **뷰가 `nickname`을 반환**해 이메일 노출을 차단한다(author inner JOIN). 마이그레이션 `0001`~`0004`.
- **모더레이션**: `lib/moderation/` (`validateText` 등 `index.ts`에서 export). 글·댓글·닉네임에 욕설 사전필터 적용, vitest로 커버.
- **추천 보안**: `/api/recommend`는 메모리 기반 rate limit **분당 5회**. `recommendation_requests` 테이블의 RLS 어드바이저 경고는 **의도적으로 무시**(UUID 추측 불가가 보안 근거). 공격 늘면 Upstash로 업그레이드.

## 한국어로 답하기

- 응답은 항상 한국어로.
- 어려운 용어 쓰지 말고 초보자한테 말하듯이 설명해줘.
- 결과만 보여주지 말고 다음에 뭘 해야 하는지도 알려줘.
- 코드 바꾸기 전에 무엇을 바꿀지 한국어로 먼저 한 줄 설명한 다음에 손대.
- 파일 지우는 명령은 실행 전에 한 번 물어봐.
