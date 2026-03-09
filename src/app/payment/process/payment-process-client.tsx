"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";
import { paymentLabel } from "@/lib/format";
import type { PaymentMethod } from "@/types/domain";

const redirectFallback = "/order";

function isPaymentMethod(value: string | null): value is PaymentMethod {
  return (
    value === "credit-card" ||
    value === "debit-card" ||
    value === "qr-code" ||
    value === "cod"
  );
}

export function PaymentProcessClient() {
  const { locale, navigate } = useShop();
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const methodParam = params.get("method");
  const method = isPaymentMethod(methodParam) ? methodParam : "credit-card";
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!orderId) {
    return (
      <PageShell
        title={locale === "th" ? "ไม่พบการชำระเงิน" : "Payment Not Found"}
        subtitle={locale === "th" ? "ไม่พบหมายเลขคำสั่งซื้อ" : "Missing order ID."}
      >
        <Link
          href={redirectFallback}
          className="inline-flex rounded-lg bg-[#023047] px-4 py-2 font-semibold text-white"
        >
          {locale === "th" ? "ไปยังคำสั่งซื้อ" : "Go to Orders"}
        </Link>
      </PageShell>
    );
  }

  const complete = async (status: "success" | "failed") => {
    setIsProcessing(true);
    setMessage(null);

    const response = await fetch("/api/v1/payments/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status }),
    });

    const payload = (await response.json()) as {
      success?: boolean;
      error?: { message?: string };
    };

    setIsProcessing(false);

    if (!response.ok || !payload.success) {
      setMessage(payload.error?.message ?? "Payment callback failed");
      return;
    }

    navigate(`/order/${orderId}/confirmation`);
  };

  return (
    <PageShell
      title={locale === "th" ? "ยืนยันการชำระเงิน" : "Complete Payment"}
      subtitle={
        locale === "th"
          ? "จำลองการตอบกลับจากผู้ให้บริการชำระเงิน"
          : "Simulated payment gateway callback flow."
      }
    >
      <section className="soft-card rounded-2xl p-6">
        <p className="text-sm text-muted-foreground">
          {locale === "th" ? "คำสั่งซื้อ" : "Order"}: <strong>{orderId}</strong>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {locale === "th" ? "วิธีชำระเงิน" : "Method"}:{" "}
          {paymentLabel(method, locale)}
        </p>

        {message ? (
          <p className="mt-4 text-sm text-destructive">{message}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={isProcessing}
            onClick={() => {
              void complete("success");
            }}
          >
            {locale === "th" ? "ชำระเงินสำเร็จ" : "Mark As Paid"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isProcessing}
            onClick={() => {
              void complete("failed");
            }}
          >
            {locale === "th" ? "ชำระเงินล้มเหลว" : "Mark As Failed"}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
