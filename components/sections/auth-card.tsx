import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand" />
          <span className="text-base font-semibold tracking-tight">
            오늘 어디 갈래?
          </span>
        </Link>
        <div className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm sm:p-8">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </p>
      </div>
    </main>
  );
}
