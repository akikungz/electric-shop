"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
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
        <div
          className="soft-card h-80 rounded-3xl bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
          aria-hidden
        />
        <div className="soft-card space-y-4 rounded-3xl p-6">
          <p className="text-sm uppercase tracking-wide text-[#4a5a68]">
            {product.category}
          </p>
          <p className="text-2xl font-bold text-[#023047]">
            {currency(product.price, locale)}
          </p>
          <p className="text-sm text-[#334856]">{product.description}</p>
          <p className="text-sm text-[#334856]">
            {locale === "th" ? "คงเหลือ" : "In stock"}:{" "}
            <strong>{product.stockQty}</strong>
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
              className="w-24 rounded-lg border border-black/15 bg-white px-3 py-2"
            />
            <button
              type="button"
              onClick={() => addToCart(product.id, qty)}
              className="rounded-full bg-[#fb8500] px-5 py-2 font-semibold text-white"
            >
              {locale === "th" ? "เพิ่มลงตะกร้า" : "Add to cart"}
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
