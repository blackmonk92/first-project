import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_TITLE = "오늘 어디 갈래? — 날씨에도 흔들리지 않는 근교 코스";
const OG_DESCRIPTION =
  "주말마다 어디 갈지 고민하다 지치셨나요? 날씨·이동시간·동행자에 맞춘 근교 코스를 30초 안에.";

export const metadata: Metadata = {
  // NEXT_PUBLIC_SITE_URL은 배포(Phase 2)에서 Vercel에 등록 → 그 전까진 localhost fallback.
  // openrouter.ts의 동일 fallback 패턴과 일관.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: SITE_TITLE,
  description:
    "주말에 어디 갈지 고민하는 시간을 줄여드려요. 날씨, 이동시간, 동행자에 맞춰 실패 확률이 낮은 근교 드라이브·당일치기 코스를 제안합니다.",
  openGraph: {
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    siteName: "오늘 어디 갈래?",
    locale: "ko_KR",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: OG_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
