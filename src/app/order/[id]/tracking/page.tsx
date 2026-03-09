"use client";

import { use } from "react";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { mapOrderStatus } from "@/lib/format";

const steps = ["pending", "paid", "packed", "shipped", "delivered"];

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { locale, getOrderById } = useShop();
  const order = getOrderById(id);
  const index = Math.max(0, steps.indexOf(order?.orderStatus ?? "pending"));

  return (
    <PageShell
      title={locale === "th" ? "ติดตามคำสั่งซื้อ" : "Track Order"}
      subtitle={
        order ? order.id : locale === "th" ? "ไม่พบคำสั่งซื้อ" : "Order not found"
      }
    >
      <section className="soft-card rounded-2xl p-6">
        <div className="space-y-3">
          {steps.map((step, stepIndex) => {
            const active = stepIndex <= index;
            return (
              <div key={step} className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${active ? "bg-[#219ebc]" : "bg-gray-300"}`}
                />
                <p className={active ? "text-[#023047]" : "text-[#6f7d88]"}>
                  {mapOrderStatus(step, locale)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
