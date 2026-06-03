// 글(제목·본문)·댓글 공유 검증. 욕설[③]만 검사한다.
// 길이는 DB CHECK가 SoT(source of truth)이므로 여기서 중복 검증하지 않는다(결정 D).
import { containsProfanity } from "./profanity";
import { fail, OK, type ValidationResult } from "./types";

export function validateText(input: string): ValidationResult {
  if (containsProfanity(input)) {
    return fail("profanity", "사용할 수 없는 표현이 포함되어 있어요.");
  }
  return OK;
}
