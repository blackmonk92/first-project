import { cn } from "@/lib/utils";
import type { Region } from "@/lib/regions";

export function RegionTag({
  region,
  className,
}: {
  region: Region | null;
  className?: string;
}) {
  // 의견(feedback) 글은 지역이 없어 태그를 표시하지 않습니다.
  if (!region) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground",
        className,
      )}
    >
      {region}
    </span>
  );
}
