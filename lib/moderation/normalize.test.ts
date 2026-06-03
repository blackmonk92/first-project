import { describe, expect, it } from "vitest";
import { normalizeForMatch } from "./normalize";

describe("normalizeForMatch — 우회 정규화 [④]", () => {
  it("대문자를 소문자로 낮춘다", () => {
    expect(normalizeForMatch("FUCK")).toBe("fuck");
  });

  it("구분문자(. _ - · 공백)를 제거한다", () => {
    expect(normalizeForMatch("s.b")).toBe("sb");
    expect(normalizeForMatch("ㅅ_ㅂ")).toBe("ㅅㅂ");
    expect(normalizeForMatch("ㅅ ㅂ")).toBe("ㅅㅂ");
    expect(normalizeForMatch("f-u-c-k")).toBe("fuck");
  });

  it("동일 문자 반복(2자+)을 1자로 축약한다", () => {
    expect(normalizeForMatch("ㅅㅂㅂㅂ")).toBe("ㅅㅂ");
    expect(normalizeForMatch("fuuuck")).toBe("fuck");
    expect(normalizeForMatch("ㅋㅋㅋㅋ")).toBe("ㅋ");
  });

  it("음절을 자모로 분해하지 않는다(스브스 ≠ ㅅㅂ)", () => {
    expect(normalizeForMatch("스브스")).toBe("스브스");
    expect(normalizeForMatch("스브스")).not.toContain("ㅅㅂ");
  });
});
