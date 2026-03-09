"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { ProductImage } from "@/components/product-image";
import { useShop } from "@/context/shop-context";
import { currency } from "@/lib/format";

export function ProductClient({ productId }: { productId: string }) {
  const { locale, addToCart, getProductById } = useShop();
  const [qty, setQty] = useState(1);
  const product = getProductById(productId);

  if (!product) {
    return (
      <PageShell
        title={locale === "th" ? "ไม่พบสินค้า" : "Product Not Found"}
        subtitle={
          locale === "th" ? "ลองกลับไปหน้าหลัก" : "Try returning to home page."
        }
      >
        <div className="soft-card rounded-2xl p-6" />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={product.name}
      subtitle={locale === "th" ? "รายละเอียดสินค้า" : "Product details"}
    >
      <section className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="soft-card h-80 overflow-hidden rounded-3xl">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="soft-card space-y-4 rounded-3xl p-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground dark:text-slate-300">
            {product.category}
          </p>
          <p className="text-2xl font-bold text-foreground dark:text-slate-100">
            {currency(product.price, locale)}
          </p>
          <p className="text-sm text-muted-foreground dark:text-slate-300">
            {product.description}
          </p>
          <p className="text-sm text-muted-foreground dark:text-slate-300">
            {locale === "th" ? "คงเหลือ" : "In stock"}:{" "}
            <strong className="text-foreground dark:text-slate-100">
              {product.stockQty}
            </strong>
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={product.stockQty}
              value={qty}
              onChange={(event) =>
                setQty(
                  Math.max(
                    1,
                    Math.min(product.stockQty, Number(event.target.value) || 1),
                  ),
                )
              }
              className="w-24 rounded-lg border border-border bg-background/85 px-3 py-2 text-foreground"
            />
            <button
              type="button"
              onClick={() => addToCart(product.id, qty)}
              className="rounded-full bg-[#fb8500] px-5 py-2 font-semibold text-white shadow-sm hover:brightness-105"
            >
              {locale === "th" ? "เพิ่มลงตะกร้า" : "Add to cart"}
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
