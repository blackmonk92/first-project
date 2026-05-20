import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          <a href="/#problem" className="hover:text-foreground transition-colors">
            왜 필요한가요
          </a>
          <a href="/#features" className="hover:text-foreground transition-colors">
            기능
          </a>
          <a href="/#preview" className="hover:text-foreground transition-colors">
            예시 코스
          </a>
          <Link href="/community" className="hover:text-foreground transition-colors">
            커뮤니티
          </Link>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <span className="hidden max-w-[180px] truncate text-xs text-muted-foreground sm:inline">
                {user.email}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-sm"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
