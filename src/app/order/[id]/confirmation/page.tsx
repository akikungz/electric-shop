"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { currency, mapOrderStatus, paymentLabel } from "@/lib/format";
import type { Order } from "@/types/domain";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { locale, getOrderById, fetchOrderById, getProductById } = useShop();
  const [order, setOrder] = useState<Order | undefined>(() => getOrderById(id));

  useEffect(() => {
    if (order) {
      return;
    }

    let mounted = true;
    void fetchOrderById(id).then((nextOrder) => {
      if (mounted) {
        setOrder(nextOrder ?? undefined);
      }
    });

    return () => {
      mounted = false;
    };
  }, [fetchOrderById, id, order]);

  if (!order) {
    return (
      <PageShell
        title={locale === "th" ? "ไม่พบคำสั่งซื้อ" : "Order Not Found"}
        subtitle={
          locale === "th" ? "คำสั่งซื้อนี้อาจหมดอายุ" : "This order may have expired."
        }
      >
        <div className="soft-card rounded-2xl p-6" />
      </PageShell>
    );
  }

  return (
    <PageShell
      title={locale === "th" ? "ยืนยันคำสั่งซื้อสำเร็จ" : "Order Confirmed"}
      subtitle={
        locale === "th" ? "ขอบคุณสำหรับการสั่งซื้อ" : "Thank you for your purchase."
      }
    >
      <section className="soft-card rounded-2xl p-6">
        <p className="text-sm text-[#335168]">Order ID</p>
        <p className="text-xl font-bold text-[#023047]">{order.id}</p>
        <div className="mt-4 grid gap-2 text-sm text-[#334856] md:grid-cols-2">
          <p>
            {locale === "th" ? "ยอดรวม" : "Total"}:{" "}
            {currency(order.totalAmount, locale)}
          </p>
          <p>
            {locale === "th" ? "ชำระด้วย" : "Payment"}:{" "}
            {paymentLabel(order.paymentMethod, locale)}
          </p>
          <p>
            {locale === "th" ? "สถานะ" : "Status"}:{" "}
            {mapOrderStatus(order.orderStatus, locale)}
          </p>
          <p>
            {locale === "th" ? "ที่อยู่จัดส่ง" : "Delivery"}:{" "}
            {order.deliveryAddress.line1}, {order.deliveryAddress.district}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            return (
              <div
                key={item.productId}
                className="rounded-xl border border-black/10 bg-white p-3 text-sm text-[#334856]"
              >
                {product?.name ?? item.productId} x{item.quantity} -{" "}
                {currency(item.quantity * item.unitPrice, locale)}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/order/${order.id}/tracking`}
            className="rounded-xl bg-[#023047] px-4 py-2 font-semibold text-white"
          >
            {locale === "th" ? "ติดตามคำสั่งซื้อ" : "Track Order"}
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-[#fb8500] px-4 py-2 font-semibold text-white"
          >
            {locale === "th" ? "กลับหน้าหลัก" : "Back to Home"}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
