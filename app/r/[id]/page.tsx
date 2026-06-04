import type { Metadata } from "next";
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

// 결과 없을 때(생성 실패/대기) 쓰는 기본 설명 — 전역 OG 설명과 동일 톤.
const FALLBACK_DESCRIPTION =
  "주말마다 어디 갈지 고민하다 지치셨나요? 날씨·이동시간·동행자에 맞춘 근교 코스를 30초 안에.";

// 카톡 등 공유 시 미리보기 카드용 메타. ⚠️ region·regionDetail·companion 등
// 비민감 필드만 사용한다. input.email 등 민감정보는 절대 노출하지 않음(C3 일관성).
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  // 형식 불량·미존재는 기본(전역) 메타로 떨어뜨린다. notFound 처리는 page 본문이 담당.
  if (!UUID_RE.test(id)) return {};
  const record = await getRecommendationById(id);
  if (!record) return {};

  const { region, regionDetail, companion } = record.input;
  const facets = [region, regionDetail, companion].filter(Boolean).join("·");
  const title = `[오늘 어디 갈래?] ${facets} 주말 코스`;
  const description = record.result?.planA.summary ?? FALLBACK_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "오늘 어디 갈래?",
      locale: "ko_KR",
      url: `/r/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

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
