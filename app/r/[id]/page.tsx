import Link from "next/link";
import { notFound } from "next/navigation";

import { RecommendResult } from "@/components/sections/recommend-result";
import { RecommendShare } from "@/components/sections/recommend-share";
import { getCuratedPlaces } from "@/lib/curation/queries";
import { getRecommendationById } from "@/lib/recommend/store";

// id 컬럼이 PostgreSQL uuid 타입이라 비-UUID 문자열을 넘기면 Supabase가
// "invalid input syntax for type uuid" 에러를 던져 500이 떴다.
// DB 쿼리 전 형식 검사로 500 → 404로 분기.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function RecommendationResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!UUID_RE.test(id)) notFound();

  const record = await getRecommendationById(id);
  if (!record) notFound();

  // 큐레이션 매치로 정확한 naverUrl 사용. 매치 안 되는 stop은 검색 URL.
  // 큐레이션 데이터 채워질수록 자연스럽게 정확한 링크로 진화.
  const curated = await getCuratedPlaces({ regions: [record.input.region] });

  const hasResult = record.result !== null;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
      <div className="mb-6">
        <Link
          href="/#recommend"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← 다시 추천 받기
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            추천 결과
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {record.input.region}
            {record.input.regionDetail
              ? ` · ${record.input.regionDetail}`
              : ""}
            {record.input.companion ? ` · ${record.input.companion}` : ""}
          </p>
        </div>
        {hasResult && (
          <RecommendShare
            variant="icon"
            region={record.input.region}
            regionDetail={record.input.regionDetail}
            companion={record.input.companion}
          />
        )}
      </div>

      {!hasResult ? (
        <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
          이 요청은 결과가 저장되지 않았어요. 다시 추천을 받아주세요.
        </div>
      ) : (
        <>
          <div className="mt-10">
            <RecommendResult result={record.result!} curated={curated} />
          </div>
          <div className="mt-8">
            <RecommendShare
              variant="block"
              region={record.input.region}
              regionDetail={record.input.regionDetail}
              companion={record.input.companion}
            />
          </div>
        </>
      )}
    </main>
  );
}
