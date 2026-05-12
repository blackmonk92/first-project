import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘 어디 갈래? — 날씨에도 흔들리지 않는 근교 코스",
  description:
    "주말에 어디 갈지 고민하는 시간을 줄여드려요. 날씨, 이동시간, 동행자에 맞춰 실패 확률이 낮은 근교 드라이브·당일치기 코스를 제안합니다.",
  openGraph: {
    title: "오늘 어디 갈래? — 날씨에도 흔들리지 않는 근교 코스",
    description:
      "주말마다 어디 갈지 고민하다 지치셨나요? 날씨·이동시간·동행자에 맞춘 근교 코스를 30초 안에.",
    type: "website",
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
