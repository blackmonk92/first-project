import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-brand" />
          <span className="font-medium text-foreground">오늘 어디 갈래?</span>
          <span>· 날씨에도 흔들리지 않는 근교 코스</span>
        </div>
        <div className="flex items-center gap-6">
          <span>© {new Date().getFullYear()} Weekend Drive</span>
          <Link
            href="/community/feedback"
            className="hover:text-foreground transition-colors"
          >
            의견 남기기
          </Link>
        </div>
      </div>
    </footer>
  );
}
