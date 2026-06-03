// 검증 결과 공유 타입. 닉네임·글·댓글 검증이 모두 이 형태를 반환한다.
export type ModerationCode = "too_short" | "too_long" | "invalid_char" | "profanity";

export type ValidationResult =
  | { ok: true }
  | { ok: false; code: ModerationCode; message: string };

export const OK: ValidationResult = { ok: true };

export function fail(code: ModerationCode, message: string): ValidationResult {
  return { ok: false, code, message };
}
