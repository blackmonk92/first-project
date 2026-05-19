import { WaitlistForm } from "./waitlist-form";

export function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] -z-10 h-[420px] bg-[radial-gradient(ellipse_at_bottom,theme(colors.accent)_0%,transparent_60%)] opacity-70"
      />
      <div className="mx-auto w-full max-w-4xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            대기자 명단
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            다가오는 주말, 가장 먼저 받아보세요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            정식 출시 전, 신청하신 분께 매주 토요일 아침
            <br />
            그 주말에 어울리는 코스 한 개를 직접 보내드립니다.
          </p>
        </div>

        <div className="mt-12">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
