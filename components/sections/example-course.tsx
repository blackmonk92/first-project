const courseStops = [
  {
    time: "11:00",
    place: "파주 출판도시",
    type: "실내 · 도보",
    note: "지혜의숲에서 책 향과 함께 천천히. 비가 와도 실내 동선만 30분 이상.",
  },
  {
    time: "13:30",
    place: "출판도시 안 작은 식당",
    type: "점심 · 실내",
    note: "주차장에서 우산 없이 이동 가능. 웨이팅 평일 수준.",
  },
  {
    time: "15:00",
    place: "헤이리 실내 전시관",
    type: "실내 · 전시",
    note: "사진 잘 나오는 공간. 비 오는 날 가장 좋아지는 곳 중 하나.",
  },
  {
    time: "17:30",
    place: "임진강 뷰 대형 카페",
    type: "마무리 · 실내",
    note: "통창으로 비 내리는 풍경 감상. 주차 100대 이상, 늦게까지 여유.",
  },
];

const planB = [
  "비가 그치면 → 헤이리 야외 산책 → 임진각 평화누리공원 일몰",
  "비가 더 거세지면 → 일산 스타필드로 코스 단축 (왕복 30분 절감)",
  "체력이 떨어지면 → 카페에서 일찍 마무리, 18시 출발 권장",
];

export function ExampleCourse() {
  return (
    <section id="preview" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand">
            실제 추천 예시
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            비 오는 토요일, 서울 출발 커플 코스
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            ‘비가 와도 망치지 않는’ 조건으로 추천된 실제 형태의 코스 카드입니다.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-[1.4fr_1fr]">
          <article className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-gradient-to-br from-accent/60 to-transparent px-5 py-5 sm:px-7">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                  추천 코스
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                  파주 · 헤이리 실내 위주 6시간
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-background px-3 py-1 text-xs font-medium ring-1 ring-border">
                  서울 출발
                </span>
                <span className="rounded-full bg-background px-3 py-1 text-xs font-medium ring-1 ring-border">
                  커플
                </span>
                <span className="rounded-full bg-background px-3 py-1 text-xs font-medium ring-1 ring-border">
                  비 예보
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 divide-y divide-border/60 border-b border-border/60 text-center text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center justify-center gap-2 px-4 py-3 sm:flex-col sm:gap-0 sm:py-4">
                <p className="text-xs text-muted-foreground">왕복 이동</p>
                <p className="font-medium sm:mt-1">약 1시간 50분</p>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 sm:flex-col sm:gap-0 sm:py-4">
                <p className="text-xs text-muted-foreground">총 소요</p>
                <p className="font-medium sm:mt-1">6시간 30분</p>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-3 sm:flex-col sm:gap-0 sm:py-4">
                <p className="text-xs text-muted-foreground">실내 비중</p>
                <p className="font-medium sm:mt-1">85%</p>
              </div>
            </div>

            <ol className="divide-y divide-border/60">
              {courseStops.map((stop) => (
                <li key={stop.time} className="flex gap-4 px-5 py-5 sm:gap-5 sm:px-7">
                  <div className="w-12 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground sm:w-14">
                    {stop.time}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h4 className="font-semibold tracking-tight">
                        {stop.place}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        · {stop.type}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {stop.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-muted/40 px-5 py-4 text-xs text-muted-foreground sm:px-7">
              <span>주의 · 주말 오후 5시 이후 자유로 정체 가능성</span>
              <span className="font-medium text-foreground">지도 열기 →</span>
            </div>
          </article>

          <aside className="rounded-3xl border border-dashed border-brand/40 bg-background p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-brand">
                Plan B
              </span>
              <p className="text-sm text-muted-foreground">
                상황이 바뀌면 이렇게 조정해요
              </p>
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              날씨와 컨디션에 따른 대체안
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {planB.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="leading-relaxed text-foreground/90">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
              출발 30분 전 날씨를 한 번 더 확인해, 필요하면 위 플랜 B로
              자동 전환된 코스를 알림으로 보내드려요.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
