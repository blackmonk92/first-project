# 오늘 어디 갈래? — 기획서

> 작성일: 2026-05-14
> 최종 업데이트: 2026-05-19 (방향 전환 반영)

## 아이디어

상황에 맞는 주말 드라이브 코스를 짜주고, 저장해둔 장소까지 코스로 연결해주는 AI 큐레이션 서비스.

## 서비스 한 줄 설명

출발지·이동 시간·동행자·연령대·날씨·취향에 맞춰 실패 확률이 낮은 주말 드라이브 및 단기 여행 코스를 구성해주고, 가보고 싶어 저장해둔 장소나 네이버 플레이스 링크가 있다면 이를 중심으로 코스를 짜주는 AI 기반 큐레이션 서비스입니다.

---

## 문제정의

많은 사람들은 평소 SNS, 블로그, 지도 앱 등을 보며 가고 싶은 장소나 맛집, 카페를 저장해둡니다. 그러나 실제 주말이나 휴일이 되었을 때, 저장해둔 장소를 바로 방문 일정으로 연결하지 못하는 경우가 많습니다.

장소 하나를 방문하기 위해서도 사용자는 여러 정보를 따로 확인해야 합니다. 출발지에서의 이동 시간, 날씨, 주차 가능 여부, 주변 맛집과 카페, 동행자의 취향, 실내·실외 대체 코스, 영업시간 등을 각각 다른 앱과 사이트에서 검색해야 합니다.

특히 날씨가 갑자기 바뀌거나 이동 시간이 예상보다 길어지면 기존 계획을 다시 짜야 하고, 이 과정에서 피로감을 느껴 외출 자체를 포기하는 경우도 발생합니다.

기존 여행 플랫폼은 항공권, 숙소, 투어, 입장권 예약에는 강점이 있지만, 사용자가 이미 관심을 가진 특정 장소를 중심으로 **"오늘 또는 이번 주말 실제로 갈 수 있는 코스"**를 빠르게 구성해주는 기능은 상대적으로 부족합니다.

따라서 본 서비스는 "가고 싶은 곳은 있지만 코스를 짜기 귀찮은 사람들"이 저장해둔 관심 장소를 실제 실행 가능한 일정으로 전환할 수 있도록 돕고자 합니다.

## 기존 사람들은 이 문제를 어떻게 해결하고 있는가

현재 사용자는 주말 드라이브나 단기 여행 일정을 계획할 때 여러 플랫폼을 조합해 사용합니다.

먼저 인스타그램, 유튜브, 블로그, 네이버 플레이스, 지도 앱 등을 통해 가볼 만한 장소를 찾고 저장합니다. 이후 날씨 앱을 통해 비, 기온, 미세먼지 등을 확인하고, 지도 앱에서 이동 시간과 경로를 확인합니다. 주변 맛집이나 카페는 별도로 검색하고, 필요하면 예약 가능 여부도 따로 확인합니다.

하지만 이 과정은 정보가 여러 앱과 사이트에 흩어져 있어 시간이 오래 걸리고 피로도가 높습니다. 특히 광고성 후기와 실제 방문 후기를 구분하기 어렵고, 사용자의 동행자, 연령대, 이동 가능 시간, 날씨, 분위기 선호를 종합적으로 반영하기 어렵습니다.

결과적으로 사용자는 가고 싶은 장소를 저장해두고도 실제 방문 일정으로 연결하지 못하거나, 익숙한 장소만 반복해서 방문하게 됩니다.

## 솔루션

본 서비스는 사용자가 입력한 가고 싶은 장소 또는 네이버 플레이스 링크를 중심으로, 날씨·이동 시간·동행자·연령대·선호 분위기를 반영해 주말 드라이브 및 단기 여행 코스를 구성하는 AI 기반 큐레이션 서비스입니다.

사용자는 다음과 같은 정보를 입력합니다.

**입력 항목**

| 입력 항목 | 예시 |
| --- | --- |
| 출발지 | 서울, 경기, 인천 또는 상세 지역 |
| 이동 가능 시간 | 편도 1시간 / 1시간 30분 / 2시간 |
| 동행자 | 혼자 / 연인 / 친구 / 가족 / 부모님 |
| 연령대 | 20대 / 30대 / 40대 / 50대 이상 |
| 원하는 분위기 | 자연 / 카페 / 맛집 / 전시 / 조용함 / 사진 |
| 실내·실외 선호 | 실내 / 실외 / 상관없음 |
| 꼭 가보고 싶은 장소 | 네이버 플레이스 링크 또는 장소명 (선택) |
| 날씨 변수 대응 | 플랜 B 필요 여부 |

**중요:** 장소 입력은 '필수'가 아니라 '선택'.
- 장소를 입력하면 → 그 장소를 중심에 두고 코스를 구성
- 장소를 입력하지 않으면 → 출발지와 조건만으로 후보 코스를 추천

서비스는 최종적으로 다음과 같은 형태의 결과를 제공합니다.

- 추천 코스 3개
- 중심 장소 기준 예상 동선
- 주변 맛집·카페 후보
- 날씨가 좋지 않을 때의 플랜 B
- 동행자·연령대별 추천 이유
- 예상 이동 시간
- 주의할 점
- 지도 링크
- 저장 및 공유 기능

## 핵심 기능

### 1. (선택) 가고 싶은 장소 입력 기능

사용자는 "꼭 가보고 싶은 장소나 가게가 있나요?"라는 질문에 답할 수 있습니다.
있다면 네이버 플레이스 링크 또는 장소명을 입력합니다.

입력된 장소는 추천 코스를 구성하는 중심 장소로 활용됩니다.

예시:

"파주 출판도시" 입력
→ 파주 출판도시를 중심으로 주변 카페, 맛집, 실내 대체 코스, 이동 시간을 반영한 일정 구성

이 기능은 사용자가 이미 저장해둔 장소를 실제 방문 일정으로 전환한다는 점에서 서비스의 핵심 차별점입니다.

### 2. 조건 선택형 추천 기능

사용자는 긴 프롬프트를 작성할 필요 없이 선택형 입력만으로 추천을 받을 수 있습니다.

예:

- 출발지
- 이동 가능 시간
- 동행자
- 연령대
- 날씨
- 선호 분위기
- 실내·실외 선호

이를 통해 사용자는 복잡한 검색 과정 없이 자신의 상황에 맞는 코스를 빠르게 받을 수 있습니다.

### 3. 플랜 A / 플랜 B 코스 카드

날씨나 혼잡도 등 변수에 대응할 수 있도록 기본 코스와 대체 코스를 함께 제공합니다.

예시:

| 구분 | 내용 |
| --- | --- |
| 플랜 A | 맑은 날 기준 드라이브 + 산책 + 카페 |
| 플랜 B | 비 오는 날 기준 실내 전시 + 대형 카페 + 맛집 |
| 주의사항 | 주말 오후 혼잡 가능, 주차 확인 필요 |
| 실행 정보 | 지도 링크, 예상 이동 시간, 주변 후보 장소 |

이 기능을 통해 사용자는 날씨가 바뀌어도 다시 처음부터 검색하지 않고 바로 대체 일정을 선택할 수 있습니다.

## 서비스 차별점

본 서비스는 단순히 여행지를 추천하는 서비스가 아니라, 사용자가 이미 관심을 가진 장소를 실제 실행 가능한 일정으로 전환해주는 서비스입니다.

| 구분 | 기존 방식 | 본 서비스 |
| --- | --- | --- |
| 장소 탐색 | SNS, 블로그, 지도 앱에서 따로 검색 | 입력한 장소를 중심으로 코스 자동 구성 |
| 일정 구성 | 사용자가 직접 동선 조합 | 이동 시간과 주변 장소를 반영해 추천 |
| 날씨 대응 | 사용자가 다시 검색 | 플랜 B 함께 제공 |
| 동행자 고려 | 직접 판단 | 동행자·연령대별 추천 반영 |
| 실행성 | 정보 확인 후 직접 정리 | 코스 카드로 바로 확인 |
| AI 활용 | 단순 질의응답 | 장소·상황·날씨 기반 코스 구성 보조 |

또한 ChatGPT, Gemini, Claude, Perplexity와 같은 범용 AI로도 여행 추천을 받을 수는 있지만, 사용자는 여전히 프롬프트 작성, 장소 검증, 이동 시간 확인, 주변 맛집 검색, 대체 코스 탐색을 직접 수행해야 합니다.

본 서비스는 이러한 과정을 선택형 입력과 코스 카드 형태로 단순화하여, 사용자가 빠르게 외출 여부를 결정할 수 있도록 돕는 생활형 의사결정 서비스입니다.

## 시장성

최근 소비자들은 장거리 여행뿐만 아니라 주말 근교 드라이브, 당일치기 여행, 로컬 맛집·카페 탐방 등 짧고 부담 없는 외출 수요를 꾸준히 가지고 있습니다.

특히 20~40대 직장인, 커플, 친구 모임, 가족 단위 사용자는 긴 여행 계획보다 짧은 시간 안에 다녀올 수 있는 코스를 자주 필요로 합니다. 그러나 정보가 너무 많고 여러 플랫폼에 분산되어 있어, 실제 일정으로 연결하는 과정에서 피로감을 느낍니다.

본 서비스는 다음과 같은 시장 기회를 가집니다.

| 시장 요소 | 기회 요인 |
| --- | --- |
| 저장 장소 증가 | 사용자는 가고 싶은 곳을 저장하지만 실제 방문으로 연결하지 못함 |
| 검색 피로 증가 | 정보는 많지만 비교와 검증 과정이 번거로움 |
| 근교 여행 수요 | 주말·휴일 중심의 짧은 외출 니즈 존재 |
| 날씨 변수 | 비, 폭염, 한파에 대응 가능한 대체 코스 필요 |
| 로컬 상권 연결 | 맛집, 카페, 체험 공간, 전시, 숙박 등과 제휴 가능 |
| AI 활용 확산 | 개인화 추천과 자동 일정 구성에 대한 수용도 증가 |

초기에는 서울·수도권 근교 드라이브 및 당일치기 코스에 집중하고, 이후 지역 확장 및 국내 단기 여행으로 범위를 넓힐 수 있습니다.

## 현재 진행 상황 및 출시 준비

본 프로젝트는 초기 랜딩페이지 단계를 넘어, 실제 사용자가
이용 가능한 서비스 페이지로 전환하는 단계에 있다.
2026년 5월 말 1차 공개를 목표로 핵심 기능을 단계적으로 구축 중이다.

### 현재까지 구현된 기능

| 영역 | 기능 |
| --- | --- |
| 사용자 진입 | 서비스 소개(Hero / Problem / 작동방식 / 예시 코스 카드) |
| 인증 | Supabase 기반 회원가입 및 로그인 |
| 커뮤니티 | 게시글 작성·삭제, 좋아요, 댓글, 지역·카테고리 필터, 메인 페이지의 인기 게시물 미리보기 섹션 |
| 데이터 수집 | 대기자 신청 폼(이메일 및 선호 조건) |
| AI 추천 | 출발지·운전시간(왕복)·외출시간·시간대·동행자·분위기·카페 취향 입력 → OpenRouter 기반 코스 생성. Plan A/B 카드 UI. 네이버 지도 검색 링크. 큐레이션 매치 시 정확한 naverUrl 사용. 출처 라벨(AI 일반 추천 / 검증 필요)로 환각 방지. KST 기준 계절 자동 판단으로 코스 흐름 조정. |

### 1차 공개에 필요한 잔여 기능

| 우선순위 | 기능 | 목적 |
| --- | --- | --- |
| 1 | AI 추천 코스 생성 | 핵심 가치 제안의 실제 작동 |
| 2 | 추천 결과 저장 및 공유 | 재방문 및 자연 유입 경로 확보 |
| 3 | 후속 개선 (닉네임 제도, og:image, 시각 디테일 등) | 사용성·신뢰도 보완 |

### 1차 공개의 목적

1차 공개의 목적은 완성도 높은 정식 런칭이 아니라,
실제 사용자의 행동 데이터를 확보하는 데 있다. 이를 통해
서비스의 핵심 가치 제안과 추천 결과에 대한 반응을 검증하고,
이후 개선 방향과 확장 범위를 결정한다.

## 실행 계획

### 완료된 단계

- 1단계: 랜딩페이지 제작 (Hero, Problem, 작동방식, 예시 코스, 대기자 신청)
- 2단계: 사용자 인증 시스템 도입 (Supabase 회원가입·로그인)
- 3단계: 커뮤니티 기능 도입 (게시글, 좋아요, 댓글, 지역·카테고리 필터, 메인 인기글 미리보기)

### 진행 중인 단계

- 4단계: AI 추천 코스 생성 기능 연동
  사용자가 입력한 출발지, 이동 시간, 동행자, 분위기, 그리고 (선택적으로)
  가고 싶은 장소를 바탕으로 실행 가능한 코스를 자동 생성한다.
  초기에는 규칙 기반(rule-based) 추천을 우선하고, AI는 추천 이유 및
  설명 문구 작성에 활용한다.

### 1차 공개 직전에 진행할 단계

- 5단계: 추천 결과 저장 및 공유 기능
  사용자가 받은 추천 코스를 저장하거나 링크로 공유할 수 있게 하여,
  재방문 및 자연 유입을 유도한다.

### 1차 공개 이후 단계

- 6단계: 사용자 피드백 기반 개선
  실제 추천 만족도, 이탈 지점, 자주 사용되는 조건 패턴 등을 분석한다.
  큐레이션 데이터와 TourAPI 비중이 커지면서 AI 일반 추천 의존도가
  자연스럽게 줄어듦. 단, 3계층 라벨 시스템(큐레이터 추천 / 한국관광공사 /
  AI 일반 추천)은 그대로 유지. 사용자가 큐레이션 미커버 지역·취향을
  요청할 때 빈 응답 방지를 위한 안전망으로 라벨 붙여 활용.
- 7단계: API 연동 확장
  지도 API(예상 이동 시간), 지역 검색 API(주변 맛집·카페),
  날씨 API(조건 기반 추천)를 단계적으로 연동한다.
  특히 날씨 API(예: 기상청 API)는 사용자의 visitDay와 시스템 날짜를
  기반으로 해당일 날씨를 조회해, AI 응답에 정확한 날씨 안내(우산,
  자외선, 한파 등)를 추가한다. 환절기·계절 일률 안내가 아니라 실제
  예보 기반 동적 안내를 제공한다.
  관광지·문화시설·축제·행사·레포츠 등 카테고리는 TourAPI(한국관광공사)
  연동 검토. 공공데이터포털(data.go.kr) 무료, 일일 요청 제한 있음.
  음식점·카페·감성 숙소 같은 큐레이션 가치 높은 카테고리는 본인이 직접
  정리. 자동 수집된 장소도 moodTags, companionFit, myNote는 본인이
  채워야 추천 품질 나옴.
- 8단계: 후속 사용성 개선
  닉네임 제도, og:image 미리보기, 시각 디테일 정리,
  카테고리 필터 칩, 다녀온 곳 도장 지도 등.
- 9단계: 수익화 실험
  맞춤 코스 생성 유료화, 지역 카페·맛집·전시 공간 제휴,
  주말 코스 구독 콘텐츠.

### 1차 공개 목표 시점

2026년 5월 말

## 기대효과

본 서비스는 사용자가 저장해둔 장소를 실제 방문 가능한 일정으로 바꿔줌으로써, 여행 계획 과정의 검색 피로와 결정 피로를 줄입니다.

사용자는 날씨나 동행자, 이동 시간에 따라 실패 확률이 낮은 코스를 빠르게 확인할 수 있고, 지역의 맛집·카페·체험 공간은 더 많은 방문 기회를 얻을 수 있습니다.

장기적으로는 국내 근교 여행과 로컬 상권 활성화에 기여하는 생활형 여행 큐레이션 플랫폼으로 확장할 수 있습니다.

## 최종 요약문

본 서비스는 출발지·이동 시간·동행자·연령대·날씨·선호 분위기 등
사용자의 상황에 맞춰 실패 확률이 낮은 주말 드라이브 및 단기 여행 코스를
구성해주는 AI 기반 큐레이션 서비스다. 특히 사용자가 SNS·블로그·지도 앱에서
가보고 싶어 저장해둔 장소나 네이버 플레이스 링크(해외의 경우 구글맵 링크)가
있다면, 이를 중심으로 코스를 구성해 '저장만 해두고 가지 못하던 장소'를
실제 외출 일정으로 전환해준다.

많은 사용자는 가고 싶은 장소를 저장해두지만, 실제 방문 일정으로 연결하려면
이동 시간, 날씨, 주변 맛집, 주차, 대체 코스 등을 여러 앱에서 따로 확인해야
하는 불편을 겪는다. 본 서비스는 이러한 검색 피로와 결정 피로를 줄이고,
가고 싶은 곳을 부담 없이 실제 외출로 이어지게 돕는다.

현재는 사용자 인증, 지역 기반 커뮤니티, 대기자 신청 기능이 구현된 상태이며,
1차 공개를 위해 AI 추천 코스 생성 및 결과 저장·공유 기능을 구축 중이다.
공개 이후에는 사용자 반응을 바탕으로 지도·지역 검색·날씨 API를 단계적으로
연동하여 로컬 여행 큐레이션 플랫폼으로 확장할 계획이다.

## 창업 지원서용 500자 압축 버전

본 서비스는 출발지·이동 시간·동행자·연령대·날씨·취향 등 사용자의 상황에 맞춰 실패 확률이 낮은 주말 드라이브 및 단기 여행 코스를 구성해주는 AI 기반 큐레이션 서비스입니다. 특히 사용자가 SNS·블로그·지도 앱에서 가보고 싶어 저장해둔 장소나 네이버 플레이스 링크가 있다면, 이를 중심으로 코스를 짜 '저장만 해두고 가지 못하던 장소'를 실제 일정으로 전환해줍니다. 많은 사용자는 가고 싶은 장소를 저장해두지만, 실제 방문을 위해 이동 시간, 날씨, 주변 맛집, 주차, 대체 코스를 각각 따로 확인해야 하는 불편을 겪습니다. 본 서비스는 이러한 검색 피로를 줄이고, 가고 싶은 곳을 부담 없이 실제 외출로 이어주는 생활형 의사결정 서비스를 지향합니다. 초기에는 랜딩페이지와 수동 추천 테스트로 수요를 검증하고, 이후 지도 API, 날씨 API, 지역 검색, AI 기능을 단계적으로 연동해 로컬 여행 큐레이션 플랫폼으로 확장하고자 합니다.

## 한 줄 피칭 문구

가고 싶어서 저장해둔 장소를, 날씨와 동행자에 맞는 실제 주말 코스로 바꿔주는 서비스입니다.

---

## 대기자 폼(waitlist) — 은퇴·제거 (2026-07-13)

**결정: 대기자 폼 기능은 완전히 미사용 → 코드 제거. 가입자는 Supabase Auth(회원가입)로만 받는다.**

- 배경: 대기자 퍼널이 추천 퍼널로 대체되며 waitlist 컴포넌트는 어느 페이지에서도 import되지 않는 고아 코드가 됨(화면 노출 없음). API는 로컬 `.data/waitlist.json`에 저장 — Vercel의 ephemeral 파일시스템에선 쓰기 실패/데이터 손실이라 애초에 프로덕션에서 동작 불가였음.
- 제거한 것: `app/api/waitlist/route.ts`, `components/sections/waitlist-section.tsx`, `components/sections/waitlist-form.tsx`, `.gitignore`의 `/.data/` 항목.
- 결과: "가입자 수 = Supabase Authentication의 계정 수" 한 곳만 보면 됨(현재 3명, `public.profiles`와 일치). 과거 계획했던 waitlist→Supabase 테이블 이관은 폐기(진행 안 함).

---

## 메시지 우선순위 (랜딩 카피 작성 원칙)

1순위 — **"내 상황에 맞는 실패 확률 낮은 코스를 빠르게 정해준다"** (모두에게 해당하는 기본 가치)
2순위 — **"저장해둔 장소가 있으면 그걸 중심으로 짜준다"** (있는 사람에게 더 좋아지는 차별점)

페이지 어디에서도 "링크를 꼭 넣어야 추천이 된다"는 인상을 주지 않는다. '있으면 더 잘 맞춰준다'는 부가가치로 표현한다.

---

## 출처 라벨 시스템 단계별 구축

목표: 추천 결과에 각 장소의 데이터 출처를 명시해 사용자가 신뢰도를
판단할 수 있게 함.

### 3단계 우선순위

**1순위 — 큐레이터 추천 (본인이 직접 검증한 장소)**
- 본인 큐레이션 데이터에 있는 곳
- 카페, 식당, 감성 숙소, 본인이 다녀온 명소 등
- 라벨: "큐레이터 추천" 또는 비슷한 표현
- 가장 강한 신뢰도 표시

**2순위 — 공식 관광 정보 (TourAPI/한국관광공사)**
- 본인 데이터에 없지만 TourAPI에 있는 관광지·문화시설·축제 등
- 라벨: "한국관광공사 정보" 또는 "공식 관광 정보"
- 공공기관 검증 신뢰도

**3순위 — AI 일반 추천 (위 둘 다 없을 때)**
- 라벨: "(AI 일반 추천 - 검증 필요)" 또는 "(방문 전 확인 권장)"
- 사용자가 직접 검증 필요

### 매칭 로직
- 같은 장소가 본인 큐레이션과 TourAPI 둘 다 있으면 본인 큐레이션 우선
- 이름·좌표 기반 매칭 (간단한 fuzzy match)

### 구현 시점
- 큐레이터 추천 라벨: 본인 큐레이션 데이터 입력 시작할 때
- TourAPI 연동 + 한국관광공사 정보 라벨: 1차 공개 후 사용자 반응 보고 결정
- AI 일반 추천 라벨: 이미 구현 중

본인의 큐레이터로서의 가치가 시각적으로 사용자에게 전달되는 시스템.
시간이 갈수록 큐레이션 데이터가 쌓이면 자연스럽게 1순위 비중이 늘어남.

---

## 작업 일지 — 2026-05-24

오늘 처리한 항목 (단계 4 후반 ~ 단계 5-B 완료):

### 단계 4 (AI 추천) 마무리
- **travelTime 의미 정정** — 편도/왕복 분리 옵션 제거, "왕복 2/3/4/5시간"
  단일 축으로 통일. tripType 필드 폼·route에서 제거(타입·DB는 유지).
- **추천 폼 "해외" region 비활성화** — `lib/regions.ts`에
  `isRecommendDisabled` 헬퍼 추가. "곧 공개" 라벨로 표시.
- **KST 기준 계절 자동 판단** — `getSeasonKst` / `getTodayKst` 추가.
  시스템 컨텍스트로 today·season 주입. SYSTEM_PROMPT에 한여름·한겨울·
  봄·가을 코스 흐름 조정 섹션 추가.
- **환각 방지 — 다층 안전망 구축**
  - 백엔드 필터: `queries.ts`에서 `id.startsWith("sample-")` 더미 5건
    완전 차단 → AI 컨텍스트엔 진짜 큐레이션만 전달
  - 프롬프트 가드 1차: 출처 라벨 표시 의무 + 100% 확신 없으면 추천 금지
  - 프롬프트 가드 2차 (강화): "예외 없는 의무", anti-rationalization 3
    패턴 명시 ("유명해서 라벨 생략" / "공공시설이라 정확" 등 금지),
    "안다 ≠ 큐레이터가 검증" 원칙 명문화
- **장소명 정리 + 프롬프트 보강** — `cleanPlaceNameForSearch` 헬퍼로
  "또는 X" 패턴·괄호 부가설명 제거 후 검색·매칭. 프롬프트에 "단일 정확
  장소명, 두 후보 동시 제시 금지" 규칙 추가.

### 단계 5-A — 결과 카드 UI 완료
- `components/sections/recommend-result.tsx` 신규 (서버 컴포넌트)
- Plan A / Plan B 카드 (`example-course.tsx`와 같은 시각 언어 — 살구
  그라데이션 헤더, 코랄 배지, divide-y 타임라인)
- 출처 chip(작은 회색 italic) — 본문 흐름 방해 안 하는 톤
- travelTime은 두 번째 stop 위부터 `↓ N분` 가운데 정렬
- notes는 📌 + muted bg callout
- 모바일·데스크탑 반응형 (`md:grid-cols-2`)

### 단계 5-B — 네이버 지도 길찾기 완료
- 각 stop에 "지도에서 보기 →" 버튼 (모든 stop, 큐레이션·일반 추천 무관)
- 큐레이션 매치 시 `naverUrl` 사용, 매치 안 되면 검색 URL fallback
- AI 일반 추천 stop에만 작은 회색 italic 경고 한 줄 추가 ("아직 검증되지
  않은 정보라 다른 가게가 잡힐 수 있어요")
- 좌표 기반 진짜 길찾기는 단계 7(지도 API) 시점에 처리 예정

### 기획 문서 정합성
- 6단계 메모를 "절대 금지 검토" → "비중 축소 + 3계층 라벨 시스템 유지"로
  부드럽게 수정 (출처 라벨 시스템 메모와 일치하도록)
- "출처 라벨 시스템 단계별 구축" 섹션 신설 (3계층 — 큐레이터 / 한국관광
  공사 / AI 일반 추천)
- 7단계 메모에 TourAPI 연동 검토 추가

### 다음 세션(2026-05-25) 이어갈 항목
1. **"또는" 패턴 재검증** — 프롬프트 강화 후 패턴이 줄었는지 한두 번 더
   추천 받아 확인. 남아 있으면 (a) 프롬프트 더 강제 / (b) 큐레이션 데이터
   부족이 근본 원인이라 자연 해결 — 둘 중 선택.
2. **단계 5-C 공유** — 결과 URL 복사 + Web Share API (카톡·메시지). 옵션
   으로 `/r/invalid-text` 같은 비-UUID 경로의 404 graceful 처리.
3. **단계 6 배포 준비** — Vercel 환경변수(`OPENROUTER_API_KEY` 등) 설정,
   도메인 연결, production 검증. `route.ts`의 임시 디버그 로그
   `console.log("[recommend] ...")` (`TODO(temp-debug)` 마커) 제거.

---

## 작업 일지 — 2026-05-26

### "또는" 패턴 6차 검증 시퀀스
같은 두 조건(충남·천안·연인 / 서울·강남구·친구)으로 6회 반복 추천 받으며
시스템 프롬프트 강화 → 풍선효과 발견 → 코드 안전망 도입까지 진행.

| 회차 | 변경 | 다중 패턴 (place 필드) |
|---|---|---|
| 1차 | 강화 전 baseline | 5건 |
| 2차 | 프롬프트 "또는 X 패턴 피하세요" 1차 강화 | 2건 |
| 3차 | 식사·카페 "다음 명소 + 카테고리" 규칙 추가 | 1건 |
| 4차 | "근처/인근/감성/구도심" 임의 수식어 명시 금지 | 2건 (재발) |
| 5차 | "한 stop = 한 장소" 최우선 규칙 강조 | 2건 (또 재발) |
| 6차 | **`cleanPlaceName` 포스트프로세싱 안전망 도입** | **0건 (화면 표시)** |

핵심 깨달음: 시스템 프롬프트만으론 0건 보장 불가. 한 곳 누르면 다른 곳에서
부풀어 오르는 풍선효과(충남→서울→식사→명소→쇼핑) 명확히 관찰. 결국 AI 응답
받은 뒤 코드 단에서 첫 후보만 추출하는 정규식 기반 안전망으로 100% 보장.

### 도입한 변경 사항

#### components/sections/recommend-result.tsx
- **`cleanPlaceName` 통합 함수** (기존 `cleanPlaceNameForSearch` 확장):
  - 분리자: `또는/혹은/및/그리고` (한국어 단어, 공백 둘러쌈) + `/` `·` (기호)
  - 괄호 부가정보 제거
  - 화면 표시(h4)와 네이버 지도 검색 URL 모두 같은 정리 적용
- **`isReturnHomeStop` 헬퍼** — "귀가/복귀/마무리" 끝 stop은 지도 링크 숨김
  (`/(귀가|복귀|마무리)\s*$/` 정규식)

#### lib/recommend/prompt.ts
- "한 stop = 한 개의 정확한 장소 (최우선 규칙)" 섹션 — 명소·식사·카페 모든
  stop 유형에 예외 없이 적용, 다른 규칙보다 우선
- "큐레이션 미커버 지역의 식사·카페 처리" — 다음 명소 + 카테고리 형식
  ("현충사 맛집", "신정호 카페")
- "명소 이름에 임의 수식어 합성 금지" — "신정호 수변공원" 같은 가짜
  수식어 차단
- "비슷한 이름의 다른 장소 혼동 주의" — 현충사/충무사 예시
- 카테고리 부분 금지 단어 명시: "근처/인근/주변/내/안/옆/감성/구도심/분위기"

#### wishPlace rename (place → wishPlace)
- 원인: 사용자가 폼에 네이버 단축 URL(naver.me/...) 입력했더니 무시됨.
  AI(OpenRouter Claude Sonnet)는 인터넷 접속 없어 단축 URL 풀 수 없음.
  더 큰 문제는 프롬프트에 `input.place` 처리 가이드 자체가 없어서 장소
  이름을 적어도 무시되던 것.
- TS 필드 `place` → `wishPlace` rename (RecommendInput type, form state,
  API route parser). DB 컬럼 `place`는 그대로 유지, `store.ts`에서 매핑.
- 폼 placeholder: "네이버 플레이스 링크 또는 장소명" → "가고 싶은 장소
  이름 (예: 성수동 어니언 카페)". 가이드 텍스트 보강.
- 시스템 프롬프트에 "사용자 가고 싶은 장소(wishPlace) 처리" 섹션 추가 —
  반드시 코스의 한 stop으로 포함 + 위치 기준 동선 배치.

### 검증 결과 요약
- 6차 (화면 표시): **다중 패턴 0건, 명소 명칭 9/9 정확, ○○+카테고리 6/9**
- wishPlace 채운 케이스(서울·신촌·혼자 + "성수동 어니언 카페"):
  planB에는 "어니언 성수" 포함됐으나 planA에는 미포함 → 가이드 문구가
  단수형 "코스"라 AI가 "둘 중 하나"로 해석. **내일 옵션 B로 강화 예정.**
- 빈 wishPlace 케이스: 정상 작동

### 다음 세션(2026-05-27) 이어갈 항목

1. **wishPlace 두 플랜 모두 포함 강제** — 가이드 문구를 "플랜 A와 플랜 B
   두 코스 모두 반드시 wishPlace를 한 stop으로 포함"으로 명확화. 단,
   "planB가 '날씨 변수 대응(실내 중심)' 같은 명시적 변수일 때 wishPlace가
   그 변수와 충돌하면 AI 판단 여지 가능. 그 외엔 무조건 두 플랜 모두 포함"
   조건 보완.

2. **본인 폼 검증 실패 케이스 디버깅** — 사용자가 직접 폼에
   wishPlace="안국역 사찰음식 전문점 발우공양" 입력하고 제출했는데 "AI
   추천 생성에 실패했어요" 빨간 에러 발생. 클로드 코드 검증(test1g/test2g)
   은 성공했는데 실제 폼에선 실패. 내일:
   - 같은 입력으로 재시도
   - 또 실패하면 dev.log/Vercel 로그 확인 (OpenRouter API 응답, JSON 파싱,
     rate limit, 토큰 초과 등)
   - 특정 입력 조합에서 응답 실패 패턴이면 시스템 프롬프트 보강 필요

3. **위 두 가지 처리 후 단계 5-C(공유 기능) 진행**
   - 결과 URL 복사 + Web Share API (카톡·메시지)
   - `/r/invalid-text` 같은 비-UUID 경로의 404 graceful 처리

### 작업 산출물 (working dir에 남음, gitignore 대상은 아님)
- `test1[bcdef].json`, `test2[bcdef].json`, `test1f.html`, `test2f.html`,
  `test1g.json`, `test2g.json`, `test1g.html` — 6차 검증용 응답 기록.
  필요 없으면 다음 세션에 정리.

---

## 작업 일지 — 2026-05-27

오늘 처리한 항목 (단계 5-B 후속 + 검증 산출물 정리 + 단계 5-C-1 완료):

### 단계 5-B 후속 — OpenRouter 402 해결
- **원인**: 어제 폼 실패 "AI 추천 생성에 실패했어요" 버그. dev.log 분석
  결과 OpenRouter 402 — `max_tokens` 미명시라 모델 기본값(64K) 요청 →
  잔액(63,690) 부족으로 거절. 어제 후보 4개(timeout/JSON 파싱/rate limit/
  키워드 패턴) 다 빗나감.
- **수정**: `lib/recommend/openrouter.ts:40`에 `max_tokens: 12000` 추가.
  JSON 코스 2개 응답이 보통 8K~12K라 안전 마진 포함. 잔액 부족 시에도
  안 깨지는 근본 안전망.

### wishPlace 두 플랜 강제 (옵션 B)
- `lib/recommend/prompt.ts`의 wishPlace 섹션 강화 — "플랜 A·B 두 코스
  모두 반드시 포함" + 예외 조항(planB가 명시적 날씨 변수 대응이고
  wishPlace가 본질적 충돌일 때만 제외, summary에 명시).
- 검증: 서울·신촌·혼자·wishPlace="성수동 어니언 카페" curl. **planA·planB
  둘 다 1번 stop에 어니언 포함**. 어제 test1g planA 누락 케이스 해결.
  planB summary도 "성수동 어니언 카페는 그대로 포함하되, 야외 산책 대신
  실내 문화공간과 카페로 동선을 짰어요"로 변화 설명 잘 반영.

### 검증 산출물 정리
- `_verify/` 폴더 생성 + 19개 파일 이동(`test1[abcdefgh].*`,
  `test2[abcdefg].*`, `.tmp-recommend-body.json`). `.gitignore`에
  `/_verify/`, `dev.log` 추가.
- `dev.log`는 유지(단계 6 임시 디버그 로그 정리 시 같이 삭제).

### 단계 5-C-1 공유 기능 완료
- **신규 `components/sections/recommend-share.tsx`** — 두 variant:
  `icon`(상단 작은 아이콘) / `block`(하단 명시 버튼 영역). `shareOrCopy`
  통합 함수로 `navigator.share` 시도 → 미지원·secure context 위반·기타
  실패 시 자동 clipboard 폴백. 두 버튼(공유하기·링크 복사) 항상 렌더,
  동작만 환경별 분기. catch 블록에 `console.warn` 추가(silent fail
  가시화).
- 공유 텍스트 포맷: `"[오늘 어디 갈래?] {region}·{regionDetail}·{companion}
  주말 코스 추천\n{URL}"`. 누락 필드는 자연스럽게 건너뜀.
- **`app/r/[id]/page.tsx`** — 상단 헤더 우측(`variant="icon"`) + 마지막
  카드 아래(`variant="block"`) 두 군데 통합. 결과 페이지 전체(플랜 A·B
  모두 포함) 공유.
- **데스크탑 검증 통과**: 두 버튼 + 상단 아이콘 모두 클립보드 복사 +
  토스트 정상. 모바일은 LAN IP HTTP라 secure context 위반으로 silent
  fail — production HTTPS 배포 후 검증 예정.

### 단계 5-C-2 비-UUID 경로 404 graceful 처리 완료
- `app/r/[id]/page.tsx`에 UUID 정규식 가드 추가 (DB 쿼리 전 분기로
  HTTP 500 → 404)
- `app/r/[id]/not-found.tsx` 신규 (segment 전용) — "이 추천 결과를
  찾을 수 없어요 / 잘못된 링크이거나 삭제된 결과일 수 있어요" +
  "다시 추천 받기" CTA
- 단계 6 메모에 "전역 `app/not-found.tsx` 추가" 항목 후속으로 등록

### refactor(region) — community 공통 lib/regions.ts import 이동
- 단계 4 추천 기능 작업 중 region 개념을 추천·커뮤니티 공통으로
  끌어올린 lib/regions.ts에서 모든 모듈이 직접 import하도록 마무리.
  community 7개 파일의 import 경로만 정리, 동작 변경 없음.

### 단계 6 Phase 1 일부 — 1차 공개 카피·네비게이션 정비 (commit 1)
- Hero CTA "출시 알림 신청하기" → "추천 받아보기", #waitlist →
  #recommend (메인에 waitlist 섹션 빠진 상태의 dead link 해결)
- 상단 네비 강조 CTA "추천 받아보기" (데스크탑은 정보 탭 끝, 모바일은
  헤더 우측 항상 노출)
- 모바일 햄버거 MobileNav 신규 — 정보 탭·인증을 dropdown 안으로,
  외부 클릭·ESC 닫기, CJK 글자 단위 wrap 차단(block + whitespace-nowrap)
- recommend-form 안내 문구 출시 톤 색깔 제거 ("향후 이메일 발송
  (준비 중)" → "추후 서비스 소식 안내")
- 커뮤니티 글쓰기 버튼 모바일 풀폭 정렬 수정 (flex-col stretch →
  items-start로 content fit)
- 결정 이유: "추천 받아보기"는 핵심 액션이라 모바일에서도 즉시 접근,
  정보 탭·로그인은 햄버거 안으로 (회원가입이 외부 노출이고 추천이
  숨겨진 역설 해소)

### 다음 세션(2026-05-28) 이어갈 항목

**내일 시작 지점: 커밋 2 [2.1] 마이그레이션 SQL 적용부터.**

1. **커밋 2** (post_type + 의견 영역 + 카테고리 필터) — 단계 6 메모의
   "커밋 2 작업 순서" 표 따라 [2.1] ~ [2.12] 순차 진행
2. **닉네임 제도 도입** (1차 공개 전 필수) — 단계 6 메모의 신규 항목
   참조. 커밋 2 완료 직후 진입. 정책 결정 의논부터.
3. 단계 6 Phase 1 나머지(OG 메타·전역 not-found·디버그 로그)
4. Phase 2 인프라(OpenRouter 충전·Vercel 환경변수) + Phase 3 배포·검증

---

## 작업 일지 — 2026-05-28

### 커밋 2 완료 — 의견(feedback) 영역 도입 (commit d34765a)
단계 6 Phase 1 커밋 2 [2.1]~[2.12] 전부 완료. origin/main 대비 7 commits ahead.

**마이그레이션 2건 (Supabase 원격 적용 완료):**
- `posts_add_post_type_and_feedback`: post_type 컬럼(default 'place') +
  조건부 category CHECK(place 7 / feedback 4) + region nullable +
  place 글 region NOT NULL 강제 CHECK. 기존 row 1개는 default로 자동 백필.
- `posts_with_counts_add_post_type`: 뷰에 post_type 노출. **plan SQL에 누락
  발견** — 뷰에 컬럼이 없으면 listPosts의 `.eq('post_type')`가 기존
  `/community`까지 깨뜨림. 적용 후 회귀(HTTP 200·로그 무에러) 확인.

**코드 (15 파일):**
- `categories.ts` — PLACE/FEEDBACK 분리 + `PostType`/`Category` union +
  `isPlaceCategory`/`isFeedbackCategory`/`categoriesFor`/`isCategoryFor`
- `types.ts` — `Post.post_type` 추가, `region: Region | null`
- `queries.ts` — `parseCategoryFilter(value, postType)` + `CategoryFilter` +
  `listPosts`에 `postType`(default place)·`category` 필터.
  ※ `parsePostTypeFilter`는 생략(segment 분리로 라우트가 postType 결정)
- 신규: `category-filter.tsx`(categories·basePath 주입형),
  `community-nav.tsx`(영역 토글), `feedback-form.tsx`,
  `feedback/page.tsx`, `feedback/new/page.tsx`
- `actions.ts` — `createFeedback` 서버 액션 + 기존 createPost에
  `post_type:'place'` 명시
- 파생: `region-tag`(null 허용→렌더 생략), `post-card-list`(description
  ReactNode), 상세 페이지 백링크 post_type 분기, footer 교체
- 반응형 줄바꿈: 의견 hero 서브카피·EmptyState 안내문을 `sm:hidden` br로
  모바일만 의미 단위 줄바꿈(데스크탑 1줄 유지)

**검증:** tsc 0 에러, dev 캡쳐(데스크탑·모바일) 통과, 의견 글 작성
end-to-end 정상(사용자 확인), `/community` 회귀 없음.

### 다음 작업 — 우선순위 순

**1. 닉네임 제도 도입 (1차 공개 전 필수 · 배포 차단 항목)**
   - 진입 전 정책 5항목 확정 필요: 중복 허용 / 변경 횟수 / 욕설 필터 /
     글자수 / 최초 미설정 사용자 처리.
   - 상세: 아래 "단계 6 Phase 1 — 닉네임 제도 도입" 섹션 + memory
     `project-nickname-system`. 작성자 표시(현재 이메일 @앞)가 보안
     리스크라 가장 먼저 처리.

**2. 단계 6 Phase 1 나머지**
   - ✅ #7 전역 `app/not-found.tsx` 추가 — 완료(bd8b3cf)
   - ✅ #8 `app/api/recommend/route.ts` 임시 디버그 로그 제거 — 완료(bd8b3cf)
   - ✅ #6 결과 페이지(`/r/[id]`) OG 메타 — **1차 완료 (2026-06-04, 이미지 후속)**. 전역(`app/layout.tsx`): `metadataBase`(NEXT_PUBLIC_SITE_URL 없으면 localhost fallback, 배포 때 승격) + openGraph 보강(siteName·locale·url) + twitter summary_large_image 카드. 결과 페이지: `generateMetadata`로 동적 title(`[오늘 어디 갈래?] {region·regionDetail·companion} 주말 코스`)·description(hasResult면 planA 요약, 없으면 기본). ⚠️ title·description에 `input.email` 등 민감정보 미포함(C3 일관성). **og:image는 후속(C2 동적 OG)**, 실제 URL은 배포(Phase 2)에서 env 등록.

**2-B. 사전 예방 필터링 (신설 · 1차 공개 필수)**
   - 금칙어 blocklist + 빈도 제한(서버사이드). 닉네임 욕설 필터(C2)와 같은 모듈 공유.
   - 패턴·AI·CAPTCHA는 1차 공개 후 운영하며 도입 판단.
   - ✅ **작성 경로 연결 완료 (2026-06-04)** — C2 `validateText`를 글·댓글 작성 액션(`app/community/actions.ts`)에 연결. `createPost`(제목·본문·장소명), `createFeedback`(제목·본문), `createComment`(본문) insert 직전 욕설 검사. 기존 검증(필수·길이·카테고리) 뒤, 첫 실패 1개 `{ error, values }` 반환(폼 UI 무수정). tsc 0, 37 tests pass.

**3. 단계 6 Phase 2 — 인프라** — ✅ 완료
   - ✅ OpenRouter 크레딧 충전, Vercel 환경변수 설정 (대시보드 등록 완료)

**4. 단계 6 Phase 3 — 배포·검증** — ✅ 완료 (라이브)
   - ✅ production 배포됨: **https://first-project-five-pi-28.vercel.app**
   - **배포 방식**: Vercel 대시보드 ↔ GitHub 저장소(`blackmonk92/first-project`) 연동.
     **main 브랜치에 push하면 Vercel이 자동 감지해 배포** (로컬 CLI 배포 아님).
   - ⚠️ **로컬에 `.vercel/`·`vercel.json` 없는 게 정상** (GitHub 연동 배포라 로컬 연결 파일 불필요).
     **로컬에서 Vercel CLI `link` 하지 말 것** — 배포 경로 이원화 방지.
   - 잔여 후속: 도메인 연결(현재 vercel.app 서브도메인), 모바일 share/clipboard HTTPS 검증,
     카톡 OG 미리보기 실측

**5. 배포 후 발견·성장 기능 (다음 세션 · 2026-06-04 기록)**

*배포 후 발견 — 다음 세션*
   - ✅ 카페 추천 키워드화 — 완료(42ce77a). 카페 place를 "지역+카페" 키워드로 통일.
   - 로그인 화면 카피 "저장해둔 코스와 알림 설정" — 코스 저장·알림 기능이 아직
     없으니 카피 정리 필요(또는 코스 저장 기능 만들면 자동 해소).
   - 비로그인 추천 허용 유지 여부 결정 — 1차 공개엔 유지 방향.
   - 이메일 인증 UX 점검 — Supabase 무료플랜은 인증 토큰 만료가 짧음. 사용자
     늘면 재점검.

*성장 기능 — 1차 공개 후 반응 보며*
   - 코스 동선 시각화: 추천 결과 지도에 코스 지점 마커 + 순서대로 선 연결
     (1차 직선, 실제 도로경로는 후속).
   - 다녀온 곳 지도: 마이페이지에 내 커뮤니티 인증 글(`post_type=place`)의
     장소(`placeName`·`placeUrl`)를 포인트로. (memory `project-visited-places-map`)
   - 코스 저장하기: 추천 결과를 사용자별 보관, 마이페이지 목록.
   - ⚠️ 공통 선결 과제: 장소 텍스트/링크(`placeUrl`)에서 **좌표 추출 방법** —
     위 지도 기능 3개가 이 과제를 공유. 현재 좌표 컬럼 없음.

*기존 후속*
   - og:image 동적 OG(C2) — 배포 후 카톡 실측과 묶임.
   - ~~waitlist 고아 코드 cleanup~~ → ✅ 완료(2026-07-13, 3개 파일 제거). 위 "대기자 폼 은퇴" 섹션 참조.

**6. 법적/규제 대비 (다음 세션 · 2026-07-13 기록) — 전문가 자문 병행 권장**

> 아직 구현 안 함. 목록만 기록. 우선순위 순.

1. **개인정보처리방침 페이지 신설** — 수집 항목(이메일 등)·이용 목적·보관 기간·문의처를
   담은 정적 페이지 + 푸터 링크. 내용 자체는 표준 양식 참고, 전문가 검토 권장.
2. **나이 확인** — 가입 시 만 14세 이상 확인(체크박스 또는 생년월일). 14세 미만 유입 방지.
3. **탈퇴 기능 점검** — 탈퇴 기능 유무 확인 → 탈퇴 시 데이터 처리 방식(삭제/보관) 정리.
4. **민감정보 로그/응답 노출 점검** — C3에서 이메일 노출 잡았듯, 다른 곳(로그·API 응답 등)에
   민감정보 새는 데 없는지 재점검.

*참고 (현재 해당 낮음)*
   - 비밀번호: Supabase Auth가 해싱 관리 → 자체 처리 불필요.
   - 광고·야간 푸시: 마케팅 알림 기능 없어 해당 없음. 생기면 챙길 것(수신 동의·야간 발송 규제).
   - 주민번호: 미수집.
   - ⚠️ "출발지"가 위치정보법상 위치정보에 해당하는지 애매 — 판단 필요.

> ⚠️ 본격 운영·수익화 전 개인정보보호 전문가 점검 권장.

---

## 단계 6 (배포 준비) 작업 메모

1차 공개 직전에 한 번에 정리할 항목. 단계 5-C(공유 기능) 완료 후 진입.

### 환경 / 인프라
> ✅ **이미 라이브 배포됨** — https://first-project-five-pi-28.vercel.app
> 배포 방식: Vercel↔GitHub(`blackmonk92/first-project`) 연동, **main push → 자동 배포**.
> ⚠️ 로컬에 `.vercel/`·`vercel.json` 없는 게 정상. **로컬 Vercel CLI `link` 하지 말 것**(배포 경로 이원화 방지).

- ✅ Vercel 환경변수 설정 완료 (`OPENROUTER_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_SITE_URL`) — 대시보드 등록됨
  - service role은 현재 불필요(트리거 `security definer`로 프로필 생성, 앱은 RLS 내 동작). admin 일괄 작업 필요해지면 재도입.
- 도메인 연결(잔여 — 현재 vercel.app 서브도메인), production 빌드 검증 ✅
- ✅ OpenRouter 크레딧 충전 완료 (1차 공개 트래픽 대비)
- `app/api/recommend/route.ts`의 임시 디버그 로그
  `console.log("[recommend] ...")` (`TODO(temp-debug)` 마커) 제거

### 메인 화면 카피 정리 — ✅ 완료 (2026-06-04)
- **CTA 버튼 문구 수정** — ✅ 완료. Hero CTA "추천 받아보기" + `#recommend`(이미 적용),
  푸터 "의견 남기기"(2.10 ✅). 메인 랜딩은 이미 "실사용" 톤 정합.
- **부제·서브카피 톤 점검** — ✅ 완료. 키워드 grep 결과 Hero·Problem·작동방식·예시
  코스엔 "출시 전/대기자" 톤 없음(이미 정합). 유일한 실노출 잔재였던
  `app/signup/page.tsx` 설명("출시 알림을 가장 먼저") → "가입하면 맞춤 코스 추천과
  커뮤니티를 모두 이용할 수 있어요."로 교체.
- 🧹 ~~**별도 cleanup 후보** — waitlist 고아 코드 제거~~ → ✅ 완료(2026-07-13).
  `waitlist-section.tsx`·`waitlist-form.tsx`·`app/api/waitlist/route.ts` 제거,
  `.data/waitlist.json` 흐름·`.gitignore` 항목 정리. 위 "대기자 폼 은퇴" 섹션 참조.

### 공유 미리보기 (OG 메타) + 모바일 production 검증
- **OG 메타 태그 세팅** — 결과 페이지(`/r/[id]`)에 `og:title`,
  `og:description`, `og:image` 추가. 카톡으로 공유 URL 보낼 때 미리보기
  카드가 예쁘게 뜨도록.
- 5-C-1에서 도입한 공유 텍스트 포맷("[오늘 어디 갈래?] 서울·신촌·혼자
  주말 코스 추천")과 톤 일관성 맞추기.
- og:image는 정적 이미지부터 시작하고, 여유 되면 동적 OG 이미지
  (입력 조건·플랜 제목 합성) 검토.
- **모바일 share/clipboard production HTTPS 검증** — 5-C-1 공유 기능은
  LAN IP HTTP 환경에선 secure context 위반으로 silent fail(코드 문제
  아님). Vercel HTTPS 배포 후 실제 폰에서 확인:
  (1) Android Chrome / iOS Safari에서 시스템 공유 시트 정상 호출
  (2) "링크 복사" 클립보드 정상 작동
  (3) 카톡 미리보기 카드 표시 (OG 메타 적용 후)

### 기타 사용성 디테일
- **전역 `app/not-found.tsx` 추가** — 현재는 `/r/[id]/not-found.tsx`만
  있음(단계 5-C-2). 다른 경로(예: `/community/[postId]` 잘못된 ID, 임의
  존재하지 않는 경로 등)에서도 일관된 친절한 404 페이지를 제공하려면
  전역 not-found 추가 필요. segment별 not-found가 우선이라 충돌 없음.

---

## 단계 6 Phase 1 — 커밋 2 작업 순서 표 (post_type + 의견 영역)

**상태**: ✅ 완료 (2026-05-28, commit d34765a). 마이그레이션 2건 Supabase 적용 +
코드 15파일 커밋. 상세는 "작업 일지 — 2026-05-28" 참조.
**커밋 메시지 prefix**: `feat(community)`

### 결정 사항 요약
- **데이터 모델**: 단일 `category` 컬럼 + `post_type` discriminator
  (별도 컬럼·테이블 분리는 likes/comments 연결·백필·NULL 관리 부담 큼)
- **URL 경로**: `/community/feedback` (segment 분리 — 의견도 커뮤니티
  성격이라 같은 도메인 하위, 페이지·필터·작성 폼 독립)
- **의견 영역 카테고리 4개**: 버그 신고 / 개선 제안 / 질문 / 후기·칭찬
  ("기타"는 의도적 제외 — 분류 가치 살리기 위해)

### 마이그레이션 SQL (적용 전 검토 완료)

```sql
-- Migration: posts_add_post_type_and_feedback
ALTER TABLE public.posts ADD COLUMN post_type text NOT NULL DEFAULT 'place';

ALTER TABLE public.posts ADD CONSTRAINT posts_post_type_check
  CHECK (post_type IN ('place', 'feedback'));

ALTER TABLE public.posts ALTER COLUMN region DROP NOT NULL;

ALTER TABLE public.posts DROP CONSTRAINT posts_category_check;

ALTER TABLE public.posts ADD CONSTRAINT posts_category_check
  CHECK (
    (post_type = 'place' AND category IN (
      '맛집', '카페', '명소', '전시·공연', '자연', '숙소', '쇼핑'
    ))
    OR (post_type = 'feedback' AND category IN (
      '버그 신고', '개선 제안', '질문', '후기·칭찬'
    ))
  );

ALTER TABLE public.posts ADD CONSTRAINT posts_region_required_for_place
  CHECK (
    (post_type = 'place' AND region IS NOT NULL)
    OR (post_type = 'feedback')
  );
```

백필: 기존 row 1개는 `default 'place'`로 자동 처리. backward-compatible
(default 유지 — 코드가 post_type 안 명시해도 'place'로 들어감).

### 작업 순서 표

| # | 작업 | 안전 멈춤 |
|---|---|---|
| 2.1 | 마이그레이션 SQL 사용자 승인 → `apply_migration` 적용 | ✅ default 'place'로 backward-compatible, 코드 미반영 상태에서도 기존 동작 정상 |
| 2.2 | `lib/community/categories.ts` — `PLACE_CATEGORIES` + `FEEDBACK_CATEGORIES` + `PostType` + `Category` union | ✅ |
| 2.3 | `lib/community/types.ts` — `Post`에 `postType` 추가, `region` nullable | ✅ |
| 2.4 | `lib/community/queries.ts` — `parsePostTypeFilter` + `parseCategoryFilter` + `listPosts({ postType, region, category })` | ✅ |
| 2.5 | `components/community/category-filter.tsx` 신규 (region-filter 패턴 복제) | ✅ |
| 2.6 | `app/community/feedback/page.tsx` 신규 — 의견 영역 페이지 + CategoryFilter UI + 안내 문구 | ⚠️ **2.6~2.8 위험 묶음** — 페이지·폼이 같이 연결돼야 의미 |
| 2.7 | `app/community/feedback/new/page.tsx` 신규 — 의견 작성 폼 페이지 | ⚠️ 2.6·2.8과 묶음 |
| 2.8 | `components/community/feedback-form.tsx` 신규 — 의견용 폼 (region 없이, feedback category) | ⚠️ 2.6·2.7과 묶음 |
| 2.9 | 두 페이지 상단 sub-nav 토글 — `[장소 추천] [의견 모음]` | ✅ |
| 2.10 | `site-footer.tsx` — "출시 알림 신청" + `#waitlist` → "의견 남기기" + `/community/feedback` | ✅ |
| 2.11 | dev 미리보기 (사용자 확인) | ✅ |
| 2.12 | git add + commit 2 | ✅ 완료 |

### 커밋 2 메시지 (이미 검토·승인 완료)

설계 의도 포함 — 6개월 후에도 파악 가능. 본문에 4가지 결정 이유 한 줄씩:
post_type 도입 의도 / 단일 category + discriminator 선택 이유 /
/community/feedback segment 분리 이유 / 의견 영역 카테고리 4개.
구체 본문은 [2.12] 직전 다시 확인.

---

## 단계 6 Phase 1 — 닉네임 제도 도입 (1차 공개 전 필수)

**우선순위**: 1차 공개 배포 차단 항목. 커밋 2 완료 직후 진입.

### 배경
- 현재 커뮤니티 글 작성자가 이메일 앞부분(예: `dlgpfus211`)으로 표시됨
- `@naver.com`·`@gmail.com` 같은 일반 포털 도메인 붙이면 실제 이메일
  추측 가능 → 봇 크롤링·스팸·피싱·credential stuffing 공격에 활용 가능
- 개인정보보호 법적 리스크. 1차 공개 전 반드시 차단.

### 정책 결정 (2026-06-02 확정)
- **중복 허용**: ❌ 유니크 강제 — `lower(nickname)` 유니크 인덱스 (Travel·travel 동일 취급, 사칭 방지)
- **변경 횟수**: 무제한 *(어뷰징 신고 시 30일 1회 제한 전환 검토 — 후속 항목)*
- **욕설 필터**: blocklist + 우회 정규화 패턴 매칭 (ㅅㅂ·s.b·ㅅ_ㅂ 등). 글·댓글·닉네임 공유 모듈
- **글자 수**: 2~20자, 한/영/숫자/`_` `.` 허용, 공백·이모지 차단
- **미설정·신규 처리**: 자동 생성 `여행자`+4자리 랜덤. 트리거+backfill로 신규/기존 전원 처리(코드 분기 없음). 의미 있는 닉 전환은 변경 UI(C4)로 유도

### profiles 스키마 (확정)
- 컬럼: `id`(uuid PK, `auth.users(id)` 참조 `on delete cascade`), `nickname`(text not null), `created_at`, `updated_at`
- 유니크: `create unique index ... (lower(nickname))`
- RLS 3정책: SELECT(누구나) / INSERT·UPDATE(본인만) / DELETE 정책 없음(cascade 정리)
- 자동 생성: `gen_unique_nickname()` + `handle_new_user()` 트리거 + 기존 사용자 backfill
- backfill 안전장치: 사후 중복 점검 — `select lower(nickname), count(*) from public.profiles group by 1 having count(*) > 1` 결과 0건 확인

### 작업 순서 (4커밋)
- **C1. DB 마이그레이션** ✅ **완료 (2026-06-03)** — profiles + RLS 3정책 + 트리거 + backfill 적용. 기존 사용자 1명 backfill(`여행자1299`), 중복 점검 0건. SQL 박제: `supabase/migrations/0001_nickname_system_profiles.sql` (이 repo 최초 추적 마이그레이션 — 이후 DB 변경도 동일 디렉터리에 박제)
- **C2. 검증 모듈** ✅ **완료 (2026-06-03)** — `lib/moderation/` 8모듈(types·blocklist·normalize·profanity·nickname·text·index). 닉네임=길이(2~20)+문자셋+욕설, 글·댓글=욕설만(`validateText`). 첫 실패 1개 반환(결정 A), 정규화 후 부분일치(C), 글·댓글 길이는 DB CHECK가 SoT(D). **vitest 도입**(첫 테스트 인프라, `npm run test`/`test:watch`) — 37 tests pass, tsc 통과
- **C3. 작성자 표시 교체** ✅ **완료 (2026-06-04)** — 작성자 표시를 이메일→닉네임으로 전환, 이메일 노출 경로 실제 차단. 뷰 2건 `DROP+CREATE VIEW`로 `author_email`(auth.users 조인) 제거 → `author_nickname`(profiles inner JOIN). 코드 5곳 교체(`types.ts` 2 타입, `queries.ts` `maskAuthor` 제거, 표시 3곳 page·post-card·comment-list). SQL 박제: `supabase/migrations/0002_posts_with_counts_author_nickname.sql`·`0003_comments_with_author_nickname.sql`.
  - 진입 직전 라이브 DDL 확인: 두 뷰 모두 `user_id`(posts/comments 동일, `author_id` 아님), `posts_with_counts` 13컬럼·`comments_with_author` 6컬럼 — 교체 후 개수·순서 유지 확인.
  - inner JOIN 안전성 검증: posts/comments user_id의 profiles 미매칭 0건, auth.users 미매칭 0건(C1 backfill+트리거 효과) → inner JOIN 채택. `npm run test` 37 pass, tsc 0.
- **C4. 닉네임 변경 UI** ✅ **완료 (2026-06-04)** — 마이페이지(`app/mypage/`)에서 본인 닉네임 변경. 서버 액션 `updateNickname`(getUser → C2 `validateNickname` → `UPDATE profiles`(RLS 본인+id 이중가드) → `23505`(`lower(nickname)` 유니크 위반) 캐치 → revalidate, `useActionState` 호환). 폼은 shadcn Input/Button/Label + `useFormStatus` pending, 에러(destructive)·성공(brand 액센트) 메시지. `updated_at`은 DB 트리거로 처리 — SQL 박제: `supabase/migrations/0004_profiles_updated_at_trigger.sql`(`set_updated_at()` 범용 함수 + `profiles_set_updated_at` BEFORE UPDATE, moddatetime 확장 의존 없음).
  - 유니크 충돌은 사전 SELECT 대신 인덱스 위반(23505) 캐치(TOCTOU 경합 회피). 검증: tsc 0, 트리거 실갱신 확인(before<after), 브라우저로 에러·성공·충돌 경로 확인.

닉네임 제도 C1~C4 전체 완료 — C1 스키마+트리거 → C2 검증모듈 → C3 이메일 노출 차단 → C4 변경 UI.

신규 가입 입력칸 추가 커밋 불필요(자동 생성 통일).

### 작업 추정
~2시간. C1→C3가 보안 핵심 경로, C4는 보너스. 컨디션 따라 커밋 단위로 끊기 가능.

### 진행 순서
정책·스키마 확정(완료) → ~~C1 SQL 검토·승인 → `apply_migration` → 백필 중복 점검~~(완료 6-03) → ~~C2 검증 모듈+vitest~~(완료 6-03) → ~~C3 작성자 표시 교체~~(완료 6-04) → ~~C4 변경 UI~~(완료 6-04). **닉네임 제도 전체 완료.**
