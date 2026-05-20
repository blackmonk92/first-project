import Link from "next/link";

import { cn } from "@/lib/utils";
import { REGIONS } from "@/lib/community/regions";
import type { RegionFilter as RegionFilterValue } from "@/lib/community/queries";

export function RegionFilter({ active }: { active: RegionFilterValue }) {
  const items: { value: RegionFilterValue; label: string }[] = [
    { value: "all", label: "전체" },
    ...REGIONS.map((r) => ({ value: r, label: r })),
  ];

  return (
    <nav
      aria-label="지역 필터"
      className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <ul className="flex w-max gap-2 sm:flex-wrap">
        {items.map((item) => {
          const isActive = item.value === active;
          const href =
            item.value === "all"
              ? "/community"
              : `/community?region=${encodeURIComponent(item.value)}`;
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
