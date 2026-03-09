"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";

export function SearchClient() {
  const { locale, searchProducts, navigate, productsLoading } = useShop();
  const params = useSearchParams();
  const initialKeyword = params.get("q") ?? "";
  const [keyword, setKeyword] = useState(initialKeyword);
  const [visibleCount, setVisibleCount] = useState(9);

  const results = useMemo(
    () => searchProducts(keyword),
    [keyword, searchProducts],
  );
  const visibleResults = results.slice(0, visibleCount);

  return (
    <PageShell
      title={locale === "th" ? "ค้นหาสินค้า" : "Search Products"}
      subtitle={
        locale === "th"
          ? "ค้นหาจากชื่อหรือคำอธิบาย"
          : "Search by product name or keyword."
      }
    >
      <div className="soft-card mb-6 rounded-2xl p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            navigate(`/search?q=${encodeURIComponent(keyword)}`);
          }}
          className="flex flex-col gap-3 md:flex-row"
        >
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder={locale === "th" ? "ค้นหา..." : "Search..."}
            className="flex-1 rounded-xl border border-black/15 bg-white px-4 py-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-[#023047] px-4 py-2 font-semibold text-white"
          >
            {locale === "th" ? "ค้นหา" : "Search"}
          </button>
        </form>
      </div>

      {productsLoading ? (
        <p className="text-sm text-muted-foreground">
          {locale === "th" ? "กำลังโหลดสินค้า..." : "Loading products..."}
        </p>
      ) : null}

      {!productsLoading && results.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {locale === "th" ? "ไม่พบสินค้าที่ค้นหา" : "No matching products found."}
        </p>
      ) : null}

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {!productsLoading && visibleResults.length < results.length ? (
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((current) => current + 6)}
          >
            {locale === "th" ? "โหลดเพิ่ม" : "Load More"}
          </Button>
        </div>
      ) : null}
    </PageShell>
  );
}
