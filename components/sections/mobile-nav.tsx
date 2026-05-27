"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { logout } from "@/app/auth/actions";

type Props = {
  userEmail: string | null;
};

export function MobileNav({ userEmail }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭·ESC로 닫기. open=false일 땐 리스너 attach 안 함.
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent/40"
      >
        <HamburgerIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 min-w-[14rem] overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
          <nav className="flex flex-col py-2 text-sm">
            <a
              href="/#problem"
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
            >
              왜 필요한가요
            </a>
            <a
              href="/#features"
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
            >
              기능
            </a>
            <a
              href="/#preview"
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
            >
              예시 코스
            </a>
            <Link
              href="/community"
              onClick={close}
              className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
            >
              커뮤니티
            </Link>
          </nav>
          <div className="border-t border-border" />
          {userEmail ? (
            <div className="py-2">
              <p className="truncate px-4 py-1 text-xs text-muted-foreground">
                {userEmail}
              </p>
              <form action={logout}>
                <button
                  type="submit"
                  className="block w-full whitespace-nowrap px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-accent/40"
                >
                  로그아웃
                </button>
              </form>
            </div>
          ) : (
            <nav className="flex flex-col py-2 text-sm">
              <Link
                href="/login"
                onClick={close}
                className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                onClick={close}
                className="block whitespace-nowrap px-4 py-2.5 text-foreground transition-colors hover:bg-accent/40"
              >
                회원가입
              </Link>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
