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
            주말마다 반복되는 ‘어디 가지?’를 끝내는 가장 빠른 방법
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-6xl">
            <span className="block">날씨가 바뀌어도</span>
            <span className="block">
              <span className="text-brand">실패하지 않는</span> 근교 코스
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            출발 지역·이동 시간·동행자만 고르면, 날씨와 상황 변화에도
            <br className="hidden md:block" />
            흔들리지 않는 당일치기 드라이브 코스를 30초 안에 받아보세요.
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
              주말 코스 먼저 받아보기
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            대기자에게 매주 토요일 아침, 그 주말에 어울리는 코스를 미리 보내드립니다.
          </p>
        </div>
      </div>
    </section>
  );
}
