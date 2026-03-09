"use client";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { useShop } from "@/context/shop-context";
import type { Category } from "@/types/domain";

export function CategoryClient({
  category,
  categoryLabel,
}: {
  category: Category;
  categoryLabel: string;
}) {
  const { locale, getProductsByCategory } = useShop();
  const products = getProductsByCategory(category);

  return (
    <PageShell
      title={categoryLabel}
      subtitle={
        locale === "th"
          ? `พบสินค้า ${products.length} รายการ`
          : `${products.length} products in this category`
      }
    >
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </PageShell>
  );
}
