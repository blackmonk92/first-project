const painPoints = [
  {
    badge: "검색 피로",
    title: "앱 5개를 오가며 후기 확인",
    body:
      "지도 앱에서 장소를 찾고, 블로그에서 후기를 보고, 또 다른 앱에서 날씨를 확인하고… 결국 결정은 미뤄지고 시간만 사라집니다.",
  },
  {
    badge: "날씨 변수",
    title: "비가 와서 갈 곳이 사라짐",
    body:
      "아침에 비 소식이 뜨면 어제까지 짠 일정이 무용지물. 다시 짤 엄두가 안 나서 결국 외출을 포기하게 됩니다.",
  },
  {
    badge: "관계 피로",
    title: "동행자 취향까지 맞추기 어려움",
    body:
      "혼자 갈 때, 친구와 갈 때, 부모님과 갈 때 좋아할 코스가 다른데, 매번 새로 찾는 건 너무 번거롭습니다.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            이런 적 있으셨죠
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            주말마다 어디 갈지 고민하다 결국 포기..
            <br />
            저만 그런거 아니죠?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            검색, 후기, 날씨, 이동시간을 따로따로 확인하다 보면
            <br className="hidden md:block" />
            결정 피로가 쌓이고 외출 자체가 부담이 됩니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {painPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-background p-7 transition-shadow hover:shadow-sm"
            >
              <span className="inline-flex rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                {p.badge}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
