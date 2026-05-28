import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/community/categories";
import type { CategoryFilter as CategoryFilterValue } from "@/lib/community/queries";

// region-filter와 같은 칩 UI. 후보 카테고리·기준 경로는 사용처(영역)별로 주입.
export function CategoryFilter({
  active,
  categories,
  basePath,
}: {
  active: CategoryFilterValue;
  categories: readonly Category[];
  basePath: string;
}) {
  const items: { value: CategoryFilterValue; label: string }[] = [
    { value: "all", label: "전체" },
    ...categories.map((c) => ({ value: c, label: c })),
  ];

  return (
    <nav
      aria-label="카테고리 필터"
      className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <ul className="flex w-max gap-2 sm:flex-wrap">
        {items.map((item) => {
          const isActive = item.value === active;
          const href =
            item.value === "all"
              ? basePath
              : `${basePath}?category=${encodeURIComponent(item.value)}`;
          return (
            <li key={item.value}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
