// 닉네임 검증 — 길이[①] + 문자셋[②] + 욕설[③] 합성. 첫 실패 1개만 반환(결정 A).
import { containsProfanity } from "./profanity";
import { fail, OK, type ValidationResult } from "./types";

export const NICKNAME_MIN = 2;
export const NICKNAME_MAX = 20;

// 허용: 한글(음절+단독 자모)·영문·숫자·_·.  / 차단: 공백·이모지·기타 기호 (결정 B)
const CHARSET = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_.]+$/;

// [①] 길이 — 코드포인트 기준(이모지/서로게이트 안전). min·max는 호출부에서 주입.
export function checkLength(value: string, min: number, max: number): ValidationResult {
  const len = [...value].length;
  if (len < min) return fail("too_short", `${min}~${max}자로 입력해 주세요.`);
  if (len > max) return fail("too_long", `${min}~${max}자로 입력해 주세요.`);
  return OK;
}

// [②] 문자셋
export function checkCharset(value: string): ValidationResult {
  if (!CHARSET.test(value)) {
    return fail("invalid_char", "한글·영문·숫자와 _ . 만 쓸 수 있어요.");
  }
  return OK;
}

export function validateNickname(raw: string): ValidationResult {
  const value = raw.trim(); // 앞뒤 공백은 제거, 내부 공백은 문자셋에서 차단

  const length = checkLength(value, NICKNAME_MIN, NICKNAME_MAX);
  if (!length.ok) return length;

  const charset = checkCharset(value);
  if (!charset.ok) return charset;

  if (containsProfanity(value)) {
    return fail("profanity", "사용할 수 없는 표현이 포함되어 있어요.");
  }
  return OK;
}
