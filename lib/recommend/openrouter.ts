import type { RecommendResult } from "./types";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL_ID = "anthropic/claude-sonnet-4.5";
const TIMEOUT_MS = 60_000;

export async function callOpenRouter(
  systemPrompt: string,
  userPrompt: string
): Promise<{ result: RecommendResult; model: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        // OpenRouter 권장 메타데이터 (대시보드 식별용).
        // 헤더는 ByteString(ASCII)만 허용 — 한글 그대로 넣으면 fetch가 TypeError.
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
        "X-Title": "weekend-drive-landing",
      },
      body: JSON.stringify({
        model: MODEL_ID,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 12000,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`OpenRouter request timed out after ${TIMEOUT_MS}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `OpenRouter request failed: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("OpenRouter response missing content");
  }

  // response_format=json_object를 지정해도 Claude가 가끔 ```json ... ``` 코드
  // 블록으로 감싸서 응답함. 1차로 그대로 파싱 시도, 실패하면 첫 { 부터 마지막
  // } 까지 추출해 재시도.
  let parsed: unknown;
  const tryParse = (text: string): unknown | null => {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  };
  parsed = tryParse(content);
  if (parsed === null) {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) parsed = tryParse(match[0]);
  }
  if (parsed === null || parsed === undefined) {
    throw new Error(
      `OpenRouter response is not valid JSON. First 300 chars: ${content.slice(0, 300)}`
    );
  }

  if (!isRecommendResult(parsed)) {
    throw new Error("OpenRouter response does not match RecommendResult shape");
  }

  return { result: parsed, model: MODEL_ID };
}

function isRecommendResult(value: unknown): value is RecommendResult {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return isPlan(v.planA) && isPlan(v.planB);
}

function isPlan(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (
    typeof v.title !== "string" ||
    typeof v.summary !== "string" ||
    !Array.isArray(v.stops)
  ) {
    return false;
  }
  return v.stops.every((s) => {
    if (!s || typeof s !== "object") return false;
    const stop = s as Record<string, unknown>;
    return (
      typeof stop.time === "string" &&
      typeof stop.place === "string" &&
      typeof stop.reason === "string"
    );
  });
}
