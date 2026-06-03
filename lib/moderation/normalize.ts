// 우회 정규화 [검증 ④]. blocklist 매칭 전에 입력과 blocklist 항목 양쪽에 적용한다.
// 예: "s.b"→"sb", "ㅅ_ㅂ"→"ㅅㅂ", "ㅅㅂㅂㅂ"→"ㅅㅂ", "F U C K"→"fuck"
//
// 주의: 한글 음절을 자모로 분해하지 않는다(결정 B/C). 따라서 음절 "스브스"와
// 자모 "ㅅㅂ"는 서로 다른 문자열로 남아 오탐이 줄어든다.

// 구분/장식 문자 제거 대상: 공백류 + _ . - · • * ~ | / \ ,
const SEPARATORS = /[\s._\-·•*~|/\\,]+/g;

export function normalizeForMatch(input: string): string {
  const stripped = input.toLowerCase().replace(SEPARATORS, "");

  // 동일 문자 연속(2자 이상)을 1자로 축약 — "ㅅㅂㅂㅂ"·"fuuuck" 류 반복 우회 차단.
  let collapsed = "";
  let prev = "";
  for (const ch of stripped) {
    if (ch !== prev) collapsed += ch;
    prev = ch;
  }
  return collapsed;
}
