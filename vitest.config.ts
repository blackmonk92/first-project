import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      // tsconfig의 "@/*" → "./*" 경로 별칭과 일치
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    // 순수 함수 검증 모듈 대상 — DOM 불필요
    environment: "node",
    include: ["lib/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
