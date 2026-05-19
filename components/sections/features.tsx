const features = [
  {
    step: "1",
    title: "조건만 고르면 끝",
    desc: "긴 프롬프트 작성 불필요.\n출발지·시간·동행자만 골라도 충분해요.",
    items: [
      "출발지 · 이동 가능 시간",
      "동행자 · 연령대",
      "분위기 · 실내외 선호",
    ],
  },
  {
    step: "2",
    title: "가고 싶은 장소가 있다면",
    desc: "네이버 플레이스 링크나 장소명만 알려주세요.\n없으면 출발지 조건만으로도 코스를 짜드려요.",
    optional: true,
    items: [
      "네이버 플레이스 링크",
      "장소명만 입력해도 OK",
      "없어도 코스 추천돼요",
    ],
  },
  {
    step: "3",
    title: "플랜 A · 플랜 B로 받아요",
    desc: "맑은 날과 비 오는 날 두 코스를 동시에.\n날씨가 바뀌어도 다시 짤 필요 없어요.",
    items: [
      "예상 이동 시간 · 추천 이유",
      "주변 맛집 · 카페 후보",
      "주의사항 · 지도 바로 열기",
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
            검색 말고, 3단계면 끝나요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            긴 프롬프트도, 앱 다섯 개 검색도 필요 없어요.
            <br />
            3단계만 거치면 오늘 갈 수 있는 코스가 손에 들어옵니다.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.step}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(to_bottom,oklch(0.80_0.12_45),oklch(0.62_0.13_45))] text-base font-bold text-brand-foreground shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5),inset_0_-3px_4px_rgba(0,0,0,0.22),0_4px_10px_-2px_rgba(0,0,0,0.28),0_2px_4px_rgba(0,0,0,0.12)]">
                  {f.step}
                </span>
                {f.optional ? (
                  <span className="inline-flex rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium text-accent-foreground">
                    선택
                  </span>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-brand/70" />
                )}
              </div>
              <h3 className="text-xl font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
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
