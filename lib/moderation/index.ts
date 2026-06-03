// 공개 API 배럴. 외부에서는 "@/lib/moderation"으로 import.
export type { ModerationCode, ValidationResult } from "./types";
export { BLOCKLIST } from "./blocklist";
export { normalizeForMatch } from "./normalize";
export { containsProfanity, findBlockedTerms } from "./profanity";
export {
  NICKNAME_MIN,
  NICKNAME_MAX,
  checkLength,
  checkCharset,
  validateNickname,
} from "./nickname";
export { validateText } from "./text";
