import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./search-client";

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search electronics and appliances in Electric Shop.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
          Loading...
        </main>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
