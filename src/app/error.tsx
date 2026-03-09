"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App route error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-4xl items-center px-4 py-10 md:px-8">
      <section className="soft-card fade-in w-full rounded-3xl p-8 text-center md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fb8500]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0d1b2a] md:text-4xl">
          Unexpected application error
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
          We hit an unexpected issue while rendering this page. Try again, or go
          back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset} className="rounded-full px-6">
            Try Again
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
