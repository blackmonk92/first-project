import { RecommendForm } from "./recommend-form";

export function RecommendSection() {
  return (
    <section
      id="recommend"
      className="relative overflow-hidden border-t border-border/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] -z-10 h-[420px] bg-[radial-gradient(ellipse_at_bottom,theme(colors.accent)_0%,transparent_60%)] opacity-70"
      />
      <div className="mx-auto w-full max-w-4xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            맞춤 코스 추천
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            오늘은 어디로 떠나볼까요?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            조건 몇 가지만 알려주시면
            <br />
            플랜 A·B 두 갈래로 코스를 짜드릴게요.
          </p>
        </div>

        <div className="mt-12">
          <RecommendForm />
        </div>
      </div>
    </section>
  );
}
