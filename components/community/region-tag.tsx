import { cn } from "@/lib/utils";
import type { Region } from "@/lib/community/regions";

export function RegionTag({
  region,
  className,
}: {
  region: Region;
  className?: string;
}) {
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
