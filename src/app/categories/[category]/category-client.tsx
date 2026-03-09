"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import type { Category } from "@/types/domain";

export function CategoryClient({
  category,
  categoryLabel,
}: {
  category: Category;
  categoryLabel: string;
}) {
  const { locale, getProductsByCategory, productsLoading } = useShop();
  const [visibleCount, setVisibleCount] = useState(9);
  const products = getProductsByCategory(category);
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <PageShell
      title={categoryLabel}
      subtitle={
        locale === "th"
          ? `พบสินค้า ${products.length} รายการ`
          : `${products.length} products in this category`
      }
    >
      {productsLoading ? (
        <p className="text-sm text-muted-foreground">
          {locale === "th" ? "กำลังโหลดสินค้า..." : "Loading products..."}
        </p>
      ) : null}

      {!productsLoading && products.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {locale === "th"
            ? "ไม่พบสินค้าในหมวดหมู่นี้"
            : "No products in this category yet."}
        </p>
      ) : null}

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {!productsLoading && visibleProducts.length < products.length ? (
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
