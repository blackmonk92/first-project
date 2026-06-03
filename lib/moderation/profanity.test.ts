import { describe, expect, it } from "vitest";
import { containsProfanity, findBlockedTerms } from "./profanity";

describe("containsProfanity — blocklist 매칭 [③]", () => {
  describe("우회 변형도 잡는다 [케이스 3]", () => {
    it.each([
      ["ㅅㅂ", "ㅅㅂ"],
      ["s.b", "sb"],
      ["ㅅ_ㅂ", "ㅅㅂ"],
      ["ㅅㅂㅂㅂ", "ㅅㅂ"],
      ["씨 발", "씨발"],
      ["F.U.C.K", "fuck"],
      ["시발놈", "시발"],
    ])("'%s' → 차단", (input) => {
      expect(containsProfanity(input)).toBe(true);
    });

    it("findBlockedTerms는 매칭된 시드를 돌려준다", () => {
      expect(findBlockedTerms("s.b")).toContain("sb");
    });
  });

  describe("오탐 방지 — 정상 단어는 통과 [케이스 4]", () => {
    it.each([
      "스브스", // 음절 '스브스'는 자모 'ㅅㅂ'를 포함하지 않음
      "개나리", // '개새끼' 시드가 있어도 '개나리'는 무관
      "passage", // bare 'ass'를 시드에 넣지 않아 통과(asshole만 차단)
      "여행자1299", // 자동 생성 닉네임
      "classic", // 'ass' 미차단
    ])("'%s' → 통과", (input) => {
      expect(containsProfanity(input)).toBe(false);
    });
  });

  it("빈 문자열은 통과(길이는 다른 검증 책임)", () => {
    expect(containsProfanity("")).toBe(false);
  });
});
