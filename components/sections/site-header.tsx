import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand" />
          <span className="text-base font-semibold tracking-tight">
            오늘 어디 갈래?
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#problem" className="hover:text-foreground transition-colors">
            왜 필요한가요
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            기능
          </a>
          <a href="#preview" className="hover:text-foreground transition-colors">
            예시 코스
          </a>
        </nav>
        <a
          href="#waitlist"
          className="shrink-0 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
        >
          <span className="sm:hidden">알림 신청</span>
          <span className="hidden sm:inline">출시 알림 신청</span>
        </a>
      </div>
    </header>
  );
}
