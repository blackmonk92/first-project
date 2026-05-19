const painPoints = [
  {
    badge: "저장 피로",
    title: "모아둔 장소가 결국 잠들어 있어요",
    body:
      "인스타·블로그·지도 앱에 흩어진 저장 목록. 막상 가려고 하면 어디부터 엮어야 할지 막막해 미루게 됩니다.",
  },
  {
    badge: "정보 흩어짐",
    title: "이동시간·날씨·주차·맛집을 따로따로",
    body:
      "한 장소를 가기 위해 앱을 4~5개 오가며 확인하다 보면, 결정하기 전에 의욕이 먼저 떨어집니다.",
  },
  {
    badge: "동행자 변수",
    title: "누구랑 가느냐로 다 달라져요",
    body:
      "혼자·연인·친구·부모님마다 맞는 분위기와 동선이 다른데, 매번 처음부터 다시 찾는 건 너무 번거롭습니다.",
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
            저장은 해뒀는데,
            <br />
            결국 안 나가게 되더라구요
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            가고 싶은 장소는 모아뒀는데, 거기까지 가는 길·날씨·주차·근처 맛집을
            <br className="hidden md:block" />
            매번 다른 앱에서 따로 확인하다 보니 결정이 미뤄지고 외출 자체가 부담이 됩니다.
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
