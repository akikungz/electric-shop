"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="app-bg min-h-screen text-foreground antialiased">
        <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-10 md:px-8">
          <section className="soft-card w-full rounded-3xl p-8 text-center md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00000]">
              Fatal error
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0d1b2a] md:text-4xl">
              The app could not load
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
              A critical error prevented the app from rendering.
              {error.digest ? ` Error ID: ${error.digest}` : ""}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={reset} className="rounded-full px-6">
                Retry
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
