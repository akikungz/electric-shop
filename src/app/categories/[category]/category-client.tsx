"use client";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { useShop } from "@/context/shop-context";
import type { Category, Product } from "@/types/domain";

export function CategoryClient({
  categoryLabel,
  products,
}: {
  category: Category;
  categoryLabel: string;
  products: Product[];
}) {
  const { locale } = useShop();

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
