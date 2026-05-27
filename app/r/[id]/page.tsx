import Link from "next/link";
import { notFound } from "next/navigation";

import { RecommendResult } from "@/components/sections/recommend-result";
import { getCuratedPlaces } from "@/lib/curation/queries";
import { getRecommendationById } from "@/lib/recommend/store";

export default async function RecommendationResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const record = await getRecommendationById(id);
  if (!record) notFound();

  // 큐레이션 매치로 정확한 naverUrl 사용. 매치 안 되는 stop은 검색 URL.
  // 큐레이션 데이터 채워질수록 자연스럽게 정확한 링크로 진화.
  const curated = await getCuratedPlaces({ regions: [record.input.region] });

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

      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        추천 결과
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {record.input.region}
        {record.input.regionDetail ? ` · ${record.input.regionDetail}` : ""}
        {record.input.companion ? ` · ${record.input.companion}` : ""}
      </p>

      {record.result === null ? (
        <div className="mt-10 rounded-3xl border border-border bg-card p-8 text-sm text-muted-foreground">
          이 요청은 결과가 저장되지 않았어요. 다시 추천을 받아주세요.
        </div>
      ) : (
        <div className="mt-10">
          <RecommendResult result={record.result} curated={curated} />
        </div>
      )}
    </main>
  );
}
