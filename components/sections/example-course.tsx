const planA = {
  badge: "Plan A",
  title: "☀️ 맑은 날 · 실외 위주",
  tags: ["파주 출판도시 중심", "커플·친구"],
  metrics: [
    { label: "왕복 이동", value: "약 1시간 50분" },
    { label: "총 소요", value: "7시간" },
    { label: "실외 비중", percent: 75 },
  ],
  stops: [
    {
      time: "11:00",
      place: "파주 출판도시 지혜의숲",
      type: "실외 · 도보",
      note: "책 향에서 정원까지 천천히 둘러보기 좋아요.",
    },
    {
      time: "13:00",
      place: "출판도시 근처 점심 맛집",
      type: "맛집 · 실내",
      note: "주말 웨이팅 길어요. 11시 도착 권장.",
    },
    {
      time: "14:30",
      place: "헤이리 예술마을 골목 산책",
      type: "실외 · 도보",
      note: "갤러리·소품샵 골목. 봄·가을 베스트.",
    },
    {
      time: "17:00",
      place: "임진각 평화누리공원 일몰",
      type: "실외 · 마무리",
      note: "광활한 잔디밭과 자전거 대여까지.",
    },
  ],
  nearby: "헤이리 카페 골목, 임진강 강가 카페",
  recommend: "자연 풍경을 좋아하는 커플·친구 모임",
  caution: "주말 오후 5시 이후 자유로 정체 가능성",
  mapQuery: "파주 출판도시 지혜의숲",
};

const planB = {
  badge: "Plan B",
  title: "🌧️ 비 오는 날 · 실내 위주",
  tags: ["파주 출판도시 중심", "비 예보 대응"],
  metrics: [
    { label: "왕복 이동", value: "약 1시간 50분" },
    { label: "총 소요", value: "6시간 30분" },
    { label: "실내 비중", percent: 85 },
  ],
  stops: [
    {
      time: "11:00",
      place: "파주 출판도시 지혜의숲",
      type: "실내 · 도보",
      note: "비가 와도 실내 동선만 30분 이상.",
    },
    {
      time: "13:30",
      place: "출판도시 안 식당",
      type: "점심 · 실내",
      note: "주차장에서 우산 없이 이동 가능.",
    },
    {
      time: "15:00",
      place: "헤이리 실내 전시관",
      type: "실내 · 전시",
      note: "사진 잘 나오는 공간.\n비 오는 날 가장 좋아져요.",
    },
    {
      time: "17:30",
      place: "임진강 뷰 대형 카페",
      type: "마무리 · 실내",
      note: "통창으로 비 내리는 풍경 감상.",
    },
  ],
  nearby: "출판도시 빵집, 별책부록 같은 큰 카페",
  recommend: "비가 와도 일정을 망치지 않고 싶을 때",
  caution: "주말 오후 5시 이후 자유로 정체 가능성",
  mapQuery: "파주 출판도시 지혜의숲",
};

const plans = [planA, planB];

function Donut({ percent }: { percent: number }) {
  return (
    <div
      role="img"
      aria-label={`${percent}%`}
      className="relative h-14 w-14 rounded-full"
      style={{
        background: `conic-gradient(var(--brand) ${percent}%, var(--accent) ${percent}% 100%)`,
      }}
    >
      <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-background">
        <span className="text-xs font-bold tracking-tight">{percent}%</span>
      </div>
    </div>
  );
}

export function ExampleCourse() {
  return (
    <section id="preview" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            실제 추천 예시
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            “파주 출판도시” 한 곳만 입력했을 때
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            같은 중심 장소라도 날씨에 따라 두 가지 코스가
            <br className="md:hidden" />
            {" "}동시에 나와요.
            <br className="hidden md:block" />
            {" "}비가 와도 다시 짤 필요 없어요.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.badge}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-br from-accent/60 to-transparent px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                    {plan.badge}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                    {plan.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background px-3 py-1 text-xs font-medium ring-1 ring-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 divide-y divide-border/60 border-b border-border/60 text-center text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {plan.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col items-center justify-center gap-2 px-4 py-3 sm:py-4"
                  >
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    {typeof m.percent === "number" ? (
                      <Donut percent={m.percent} />
                    ) : (
                      <p className="font-medium">{m.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <ol className="flex-1 divide-y divide-border/60">
                {plan.stops.map((stop) => (
                  <li
                    key={stop.time}
                    className="flex gap-4 px-5 py-5 sm:gap-5 sm:px-7"
                  >
                    <div className="w-12 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground sm:w-14">
                      {stop.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h4 className="font-semibold tracking-tight">
                          {stop.place}
                        </h4>
                        <span className="inline-flex rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                          {stop.type}
                        </span>
                      </div>
                      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {stop.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="border-t border-border/60 bg-muted/40 px-5 py-4 text-xs leading-relaxed sm:px-7">
                <div className="space-y-1.5">
                  <p>
                    <span className="font-semibold text-foreground">주변 후보 · </span>
                    <span className="text-muted-foreground">{plan.nearby}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">추천 이유 · </span>
                    <span className="text-muted-foreground">{plan.recommend}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">주의 · </span>
                    <span className="text-muted-foreground">{plan.caution}</span>
                  </p>
                </div>
                <a
                  href={`https://map.naver.com/p/search/${encodeURIComponent(plan.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/50"
                >
                  지도 보기 →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
