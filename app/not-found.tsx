import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-20 text-center md:py-28">
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        찾을 수 없는 페이지예요
      </h1>
      <p className="mt-3 text-muted-foreground">
        주소가 잘못되었거나 삭제된 페이지일 수 있어요.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
        >
          ← 홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
