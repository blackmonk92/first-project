import { cn } from "@/lib/utils";
import type { Category } from "@/lib/community/categories";

// 시각 차이: 지역(RegionTag)은 filled, 카테고리는 outlined로 metadata 두 축 구분.
export function CategoryTag({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground",
        className,
      )}
    >
      {category}
    </span>
  );
}
