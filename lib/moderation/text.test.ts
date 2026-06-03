import { describe, expect, it } from "vitest";
import { validateText } from "./text";

describe("validateText — 글·댓글 공유(욕설만) [케이스 5]", () => {
  it("욕설이 든 글·댓글은 차단", () => {
    expect(validateText("이 글 진짜 병신같다").ok).toBe(false);
    expect(validateText("ㅅㅂ 뭐임").ok).toBe(false);
  });

  it("자유 텍스트(공백·문장부호·이모지)는 통과 — 닉네임과 달리 문자셋 미적용", () => {
    expect(validateText("안녕하세요! 좋은 글이네요 :) 👍").ok).toBe(true);
    expect(validateText("주말에 양평 두물머리 다녀왔어요. 강추!").ok).toBe(true);
  });

  it("욕설 차단 시 code는 profanity", () => {
    const r = validateText("씨발");
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe("profanity");
  });
});
