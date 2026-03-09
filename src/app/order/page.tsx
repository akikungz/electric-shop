"use client";

import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { currency, mapOrderStatus, paymentLabel } from "@/lib/format";

export default function OrderListPage() {
  const { locale, orderHistory } = useShop();

  const orders = [...orderHistory].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const dateFormatter = new Intl.DateTimeFormat(
    locale === "th" ? "th-TH" : "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );

  return (
    <PageShell
      title={locale === "th" ? "รายการคำสั่งซื้อ" : "Your Orders"}
      subtitle={
        locale === "th"
          ? "ติดตามสถานะคำสั่งซื้อและดูรายละเอียดย้อนหลัง"
          : "Track each order status and review your purchase history."
      }
    >
      {orders.length === 0 ? (
        <section className="soft-card rounded-2xl p-6 text-sm text-muted-foreground">
          {locale === "th" ? "ยังไม่มีคำสั่งซื้อ" : "No orders yet."}
          <div className="mt-4">
            <Link
              href="/categories"
              className="inline-flex rounded-lg bg-[#fb8500] px-4 py-2 font-semibold text-white"
            >
              {locale === "th" ? "เลือกซื้อสินค้า" : "Start Shopping"}
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="soft-card grid gap-4 rounded-2xl p-5 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {locale === "th" ? "หมายเลขคำสั่งซื้อ" : "Order ID"}
                </p>
                <p className="font-semibold text-foreground">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {dateFormatter.format(new Date(order.createdAt))}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-border bg-background/70 px-2 py-1 text-foreground">
                    {locale === "th" ? "สถานะ" : "Status"}:{" "}
                    {mapOrderStatus(order.orderStatus, locale)}
                  </span>
                  <span className="rounded-full border border-border bg-background/70 px-2 py-1 text-foreground">
                    {locale === "th" ? "การชำระเงิน" : "Payment"}:{" "}
                    {paymentLabel(order.paymentMethod, locale)}
                  </span>
                  <span className="rounded-full border border-border bg-background/70 px-2 py-1 text-foreground">
                    {locale === "th" ? "ยอดรวม" : "Total"}:{" "}
                    {currency(order.totalAmount, locale)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                <Link
                  href={`/order/${order.id}/tracking`}
                  className="rounded-lg bg-[#023047] px-3 py-2 text-sm font-semibold text-white"
                >
                  {locale === "th" ? "ติดตามสถานะ" : "Track"}
                </Link>
                <Link
                  href={`/order/${order.id}/confirmation`}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground"
                >
                  {locale === "th" ? "ดูรายละเอียด" : "Details"}
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </PageShell>
  );
}
