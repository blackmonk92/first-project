import Link from "next/link";

import { cn } from "@/lib/utils";

// 장소 추천 / 의견 모음 두 영역을 오가는 세그먼트 토글. 두 페이지 공통 사용.
export function CommunityNav({ active }: { active: "place" | "feedback" }) {
  const items = [
    { value: "place", label: "장소 추천", href: "/community" },
    { value: "feedback", label: "의견 모음", href: "/community/feedback" },
  ] as const;

  return (
    <nav aria-label="커뮤니티 영역">
      <ul className="inline-flex rounded-full border border-border bg-card p-1">
        {items.map((item) => {
          const isActive = item.value === active;
          return (
            <li key={item.value}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand text-brand-foreground"
                    : "text-muted-foreground hover:text-foreground",
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
