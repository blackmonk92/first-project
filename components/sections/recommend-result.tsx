import { cn } from "@/lib/utils";
import type { CuratedPlace } from "@/lib/curation/types";
import type {
  RecommendPlan,
  RecommendPlanStop,
  RecommendResult,
} from "@/lib/recommend/types";

// AI가 reason 끝에 붙이는 출처 라벨을 본문과 분리한다. wording이 프롬프트
// 명세와 미세하게 달라질 수 있어 끝의 (...) 안에 키워드가 포함됐는지로
// 판별. 라벨이 여러 개 붙어 있는 경우(드물지만)도 모두 떼어낸다.
const LABEL_KEYWORDS = ["AI 일반 추천", "확인 권장", "검증된 큐레이션"];

function splitReasonLabel(reason: string): { body: string; labels: string[] } {
  let body = reason.trim();
  const labels: string[] = [];
  while (true) {
    const m = body.match(/\(([^()]+)\)\s*$/);
    if (!m) break;
    const inner = m[1].trim();
    if (!LABEL_KEYWORDS.some((k) => inner.includes(k))) break;
    labels.unshift(inner);
    body = body.slice(0, m.index!).trim();
  }
  return { body, labels };
}

// AI가 시스템 프롬프트의 "한 stop=한 장소" 규칙에도 불구하고 "A 또는 B",
// "A·B", "A/B", "A (B)" 같이 두 후보를 함께 제시하는 경우가 5회 검증 중
// 2~3회꼴로 발생. 프롬프트만으론 0% 보장 안 돼서 코드 단에서 첫 후보만
// 추출하는 안전망. 화면 표시·네이버 검색·큐레이션 매칭 모두 같은 정리 적용.
function cleanPlaceName(placeName: string): string {
  // 1) 괄호와 그 안 내용 제거: "A (B)" → "A "
  let cleaned = placeName.replace(/\s*\([^)]*\)/g, "");
  // 2) 다중 장소 separator 앞 부분만 사용
  //    - 한국어: 또는/혹은/및/그리고 (양쪽 공백 필요해 단어 중간엔 안 잡힘)
  //    - 기호: / · (공백 선택)
  cleaned = cleaned.split(/\s+(?:또는|혹은|및|그리고)\s+|\s*[/·]\s*/)[0];
  cleaned = cleaned.trim();
  return cleaned || placeName;
}

// AI가 place 문자열을 큐레이션 name과 정확히 같게 쓰지 않을 수 있어
// 공백·대소문자만 정규화한 이름 동등 비교로 매칭. 매칭되고 naverUrl이
// 있으면 그걸 쓰고, 아니면 검색 URL로 fallback.
function findCuratedMatch(
  placeName: string,
  curated: CuratedPlace[]
): CuratedPlace | undefined {
  const normalize = (s: string) => s.replace(/\s+/g, "").toLowerCase();
  const target = normalize(placeName);
  return curated.find((c) => normalize(c.name) === target);
}

function getMapUrl(
  cleanedPlaceName: string,
  curated: CuratedPlace[]
): string {
  const match = findCuratedMatch(cleanedPlaceName, curated);
  if (match?.naverUrl) return match.naverUrl;
  return `https://map.naver.com/p/search/${encodeURIComponent(cleanedPlaceName)}`;
}

// 마지막에 자주 들어가는 "귀가", "○○ 복귀", "마무리" 등은 실제 장소가
// 아니라 코스 종료 안내라 지도 검색하면 의도와 다른 결과가 잡힌다.
// place 끝에 해당 키워드가 오면 지도 링크를 숨긴다.
function isReturnHomeStop(placeName: string): boolean {
  return /(귀가|복귀|마무리)\s*$/.test(placeName.trim());
}

function StopRow({
  stop,
  isFirst,
  curated,
}: {
  stop: RecommendPlanStop;
  isFirst: boolean;
  curated: CuratedPlace[];
}) {
  const cleanedPlace = cleanPlaceName(stop.place);
  const { body, labels } = splitReasonLabel(stop.reason);
  const showMap = !isReturnHomeStop(cleanedPlace);
  const mapUrl = showMap ? getMapUrl(cleanedPlace, curated) : "";
  const isUnverified = labels.length > 0;
  return (
    <li className="px-5 py-5 sm:px-7">
      {!isFirst && stop.travelTime && (
        <p className="mb-4 text-center text-xs text-muted-foreground">
          ↓ {stop.travelTime}
        </p>
      )}
      <div className="flex gap-4 sm:gap-5">
        <div className="w-12 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground sm:w-14">
          {stop.time}
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="font-semibold tracking-tight">{cleanedPlace}</h4>
          {body && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          )}
          {labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {labels.map((label, i) => (
                <span
                  key={i}
                  className="rounded-full bg-muted px-2 py-0.5 text-[11px] italic text-muted-foreground/75"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
          {showMap && (
            <div className="space-y-1.5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent/50"
              >
                지도에서 보기 →
              </a>
              {isUnverified && (
                <p className="text-[11px] italic text-muted-foreground/75">
                  아직 검증되지 않은 정보라 다른 가게가 잡힐 수 있어요
                </p>
              )}
            </div>
          )}
          {stop.notes && (
            <p className="mt-2 rounded-lg bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              📌 {stop.notes}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

function PlanCard({
  planLabel,
  plan,
  curated,
}: {
  planLabel: string;
  plan: RecommendPlan;
  curated: CuratedPlace[];
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
      <header className="border-b border-border/60 bg-gradient-to-br from-accent/60 to-transparent px-5 py-5 sm:px-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
          {planLabel}
        </p>
        <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {plan.title}
        </h3>
        {plan.summary && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {plan.summary}
          </p>
        )}
      </header>

      {plan.stops.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground sm:px-7">
          코스 정보를 불러올 수 없어요.
        </div>
      ) : (
        <ol className="flex-1 divide-y divide-border/60">
          {plan.stops.map((stop, idx) => (
            <StopRow
              key={idx}
              stop={stop}
              isFirst={idx === 0}
              curated={curated}
            />
          ))}
        </ol>
      )}
    </article>
  );
}

export function RecommendResult({
  result,
  curated,
}: {
  result: RecommendResult;
  curated: CuratedPlace[];
}) {
  const hasPlanB = result.planB && result.planB.stops.length > 0;
  return (
    <div
      className={cn(
        "grid gap-5",
        hasPlanB ? "md:grid-cols-2" : "md:grid-cols-1"
      )}
    >
      <PlanCard planLabel="Plan A" plan={result.planA} curated={curated} />
      {hasPlanB && (
        <PlanCard planLabel="Plan B" plan={result.planB} curated={curated} />
      )}
    </div>
  );
}
