"use client";

import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { currency } from "@/lib/format";

export default function CartPage() {
  const {
    cartItemsDetailed,
    locale,
    subtotal,
    updateCartItem,
    removeCartItem,
  } = useShop();

  return (
    <PageShell
      title={locale === "th" ? "ตะกร้าสินค้า" : "Your Cart"}
      subtitle={
        locale === "th"
          ? "ตรวจสอบรายการก่อนชำระเงิน"
          : "Review your items before checkout."
      }
    >
      <section className="grid gap-5 lg:grid-cols-[1.8fr_1fr]">
        <div className="space-y-4">
          {cartItemsDetailed.length === 0 ? (
            <div className="soft-card rounded-2xl p-6 text-sm text-muted-foreground">
              {locale === "th" ? "ตะกร้าว่างอยู่" : "Your cart is empty."}
            </div>
          ) : null}

          {cartItemsDetailed.map(
            ({
              item,
              productName,
              productImage,
              unitPrice,
              lineTotal,
              maxQty,
            }) => (
              <article
                key={item.productId}
                className="soft-card grid gap-3 rounded-2xl p-4 md:grid-cols-[120px_1fr_auto] md:items-center"
              >
                <div
                  className="h-24 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${productImage})` }}
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {productName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currency(unitPrice, locale)}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {currency(lineTotal, locale)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    max={maxQty}
                    value={item.quantity}
                    onChange={(event) =>
                      updateCartItem(
                        item.productId,
                        Number(event.target.value) || 1,
                      )
                    }
                    className="w-16 rounded-lg border border-border bg-background/80 px-2 py-1 text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.productId)}
                    className="rounded-lg border border-destructive/30 px-2 py-1 text-sm text-destructive"
                  >
                    {locale === "th" ? "ลบ" : "Remove"}
                  </button>
                </div>
              </article>
            ),
          )}
        </div>

        <aside className="soft-card h-fit rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-foreground">
            {locale === "th" ? "สรุปยอด" : "Summary"}
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {locale === "th" ? "ยอดรวม" : "Subtotal"}
          </p>
          <p className="text-2xl font-bold text-foreground">
            {currency(subtotal, locale)}
          </p>
          <Link
            href={cartItemsDetailed.length ? "/checkout" : "#"}
            className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold text-white ${
              cartItemsDetailed.length
                ? "bg-[#fb8500]"
                : "pointer-events-none bg-gray-300"
            }`}
          >
            {locale === "th" ? "ชำระเงิน" : "Checkout"}
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
