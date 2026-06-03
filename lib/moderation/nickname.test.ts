import { describe, expect, it } from "vitest";
import { validateNickname } from "./nickname";

describe("validateNickname — 길이+문자셋+욕설 합성", () => {
  describe("길이 경계값 [케이스 1]", () => {
    it("1자 → 실패(too_short)", () => {
      const r = validateNickname("가");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("too_short");
    });
    it("2자 → 통과", () => {
      expect(validateNickname("여행").ok).toBe(true);
    });
    it("20자 → 통과", () => {
      expect(validateNickname("가".repeat(20)).ok).toBe(true);
    });
    it("21자 → 실패(too_long)", () => {
      const r = validateNickname("가".repeat(21));
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("too_long");
    });
  });

  describe("문자셋 [케이스 2]", () => {
    it.each(["여행자", "Traveler", "user_1.0", "여행자1299"])(
      "'%s' → 통과(한·영·숫자·_·.)",
      (nick) => {
        expect(validateNickname(nick).ok).toBe(true);
      },
    );

    it("단독 자모 'ㅋㅋ' → 통과", () => {
      expect(validateNickname("ㅋㅋ").ok).toBe(true);
    });

    it.each([
      ["a b", "내부 공백"],
      ["abc😀", "이모지"],
      ["hi!", "특수기호"],
      ["가#나", "특수기호"],
    ])("'%s'(%s) → 실패(invalid_char)", (nick) => {
      const r = validateNickname(nick);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("invalid_char");
    });
  });

  describe("욕설 + 우선순위", () => {
    it("욕설 닉네임 → 실패(profanity)", () => {
      const r = validateNickname("씨발");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("profanity");
    });

    it("첫 실패 우선순위: 길이가 문자셋·욕설보다 먼저", () => {
      // "ㅅ"(1자, 자모) → 길이 미달이 먼저 잡혀 too_short
      const r = validateNickname("ㅅ");
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe("too_short");
    });

    it("앞뒤 공백은 trim 후 검증", () => {
      expect(validateNickname("  여행자  ").ok).toBe(true);
    });
  });
});
