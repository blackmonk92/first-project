// 욕설/비속어 차단 목록 — 초기 시드. 운영 중 신고 기반으로 확장한다(망라 아님).
//
// 매칭은 profanity.ts에서 normalizeForMatch() 정규화 후 "부분일치"로 수행한다(결정 C).
// 한글은 단어 경계가 없어 드물게 오탐(false positive) 가능 — 예: "시발"⊂"시발점".
// 따라서 일반 단어의 substring이 되는 짧은 항목은 신중히 추가하고, 목록은 짧게 유지한다.
// (예: bare "ass"는 넣지 않고 "asshole"만 — "passage" 등 오탐 회피)
export const BLOCKLIST = [
  // 한국어
  "씨발",
  "시발",
  "ㅅㅂ",
  "병신",
  "ㅂㅅ",
  "지랄",
  "ㅈㄹ",
  "개새끼",
  "좆",
  "썅",
  "엿같",
  // 영어
  "fuck",
  "shit",
  "asshole",
  "bitch",
  "sb",
] as const;
