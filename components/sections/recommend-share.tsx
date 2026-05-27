"use client";

import { useState } from "react";

type Props = {
  variant: "icon" | "block";
  region: string;
  regionDetail?: string;
  companion?: string;
};

function buildSummary(
  region: string,
  regionDetail?: string,
  companion?: string
): string {
  const parts: string[] = [region];
  if (regionDetail) parts.push(regionDetail);
  if (companion) parts.push(companion);
  return parts.join("·") + " 주말 코스 추천";
}

export function RecommendShare({
  variant,
  region,
  regionDetail,
  companion,
}: Props) {
  const [copied, setCopied] = useState(false);

  const summary = buildSummary(region, regionDetail, companion);
  const shareText = `[오늘 어디 갈래?] ${summary}`;

  // 카톡 본문 안 URL을 보고 미리보기 카드를 생성하므로 클립보드엔 본문+URL 묶어 복사.
  async function copyToClipboard(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      // Secure context 위반(LAN IP HTTP 등) 또는 권한 거부 — production HTTPS에선 통과.
      console.warn("[share] clipboard.writeText failed:", err);
      return false;
    }
  }

  // 모바일·HTTPS면 시스템 시트, 데스크탑·미지원·secure context 위반이면 클립보드로 자동 폴백.
  async function shareOrCopy() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "오늘 어디 갈래?",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.warn(
          "[share] navigator.share failed, falling back to clipboard:",
          err
        );
      }
    }
    await copyToClipboard();
  }

  if (variant === "icon") {
    return (
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={shareOrCopy}
          aria-label="공유하기"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent/50"
        >
          <ShareIcon />
        </button>
        {copied && (
          <span className="pointer-events-none absolute right-0 top-full z-10 mt-1.5 whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-[11px] font-medium text-background shadow-md">
            링크가 복사됐어요
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card/40 px-5 py-5 sm:px-7 sm:py-6">
      <p className="text-sm text-muted-foreground">
        마음에 드는 코스가 있다면 공유해보세요.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={shareOrCopy}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
        >
          <ShareIcon />
          공유하기
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent/50"
        >
          <LinkIcon />
          링크 복사
        </button>
        {copied && (
          <span className="text-xs text-muted-foreground">
            ✓ 링크가 복사됐어요
          </span>
        )}
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
