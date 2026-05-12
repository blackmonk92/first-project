const features = [
  {
    step: "01",
    title: "조건만 고르면 끝",
    desc: "출발지, 이동 가능 시간, 동행자, 분위기. 4가지만 선택하면 그 주말에 맞는 코스를 골라드려요.",
    items: [
      "출발 지역과 왕복 가능 시간",
      "혼자 · 연인 · 친구 · 가족",
      "감성 카페형 / 자연 힐링형 / 실내 안전형",
    ],
  },
  {
    step: "02",
    title: "날씨가 흔들려도 플랜 B",
    desc: "비 예보, 미세먼지, 강풍까지 반영해 야외 코스가 어려운 날엔 실내 대안을 함께 제시합니다.",
    items: [
      "출발 직전 날씨 재확인",
      "야외 → 실내 자동 대체",
      "취소 부담 적은 장소 우선",
    ],
  },
  {
    step: "03",
    title: "바로 실행되는 코스 카드",
    desc: "‘좋아 보이는 곳’이 아니라, ‘오늘 실제로 갈 수 있는’ 코스. 필요한 정보만 한 카드에 담아드려요.",
    items: [
      "이동 시간 · 주차 가능 여부",
      "왜 이 조합인지 추천 이유",
      "주의할 점 · 지도 바로 열기",
    ],
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            How it works
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            ‘검색’이 아니라 ‘결정’을 도와드려요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            화려한 추천 100개 대신, 오늘의 조건에 맞는 단 하나의 코스.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.step}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="mb-6 flex items-baseline justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  {f.step}
                </span>
                <span className="h-2 w-2 rounded-full bg-brand/70" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-5 text-sm">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span className="text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
