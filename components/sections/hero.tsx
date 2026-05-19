import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-10%] -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,theme(colors.accent)_0%,transparent_60%)] opacity-70"
      />
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            이번 주말, 무엇을 하든 실패하지 않게
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl">
            <span className="block">내 상황에 맞는 코스,</span>
            <span className="block">
              <span className="text-brand">고민 없이</span> 한 번에
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            출발지·이동시간·동행자만 골라도 충분해요.
            <br className="hidden md:block" />
            가고 싶어 저장해둔 장소가 있다면 함께 알려주세요
            <br className="hidden md:block" />
            <span className="text-brand">▶</span> 그 장소를 중심으로 코스를 다시 짜드릴게요.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full bg-brand px-7 text-base font-medium text-brand-foreground hover:bg-brand/90"
              )}
            >
              출시 알림 신청하기
            </a>
            <a
              href="#preview"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-12 rounded-full px-7 text-base font-medium"
              )}
            >
              예시 코스 보기
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            가고 싶은 장소가 없어도 괜찮아요.
            <br className="md:hidden" />
            {" "}조건만 골라도 코스를 추천해드려요.
          </p>
        </div>
      </div>
    </section>
  );
}
