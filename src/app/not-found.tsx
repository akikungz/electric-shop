import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-4xl items-center px-4 py-10 md:px-8">
      <section className="soft-card fade-in w-full rounded-3xl p-8 text-center md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#219ebc]">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0d1b2a] md:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          The page you requested does not exist or may have been moved.
          <br />
          ไม่พบหน้าที่คุณกำลังค้นหา หรือหน้าอาจถูกย้ายตำแหน่ง
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="rounded-full px-6">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/search">Browse Products</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
