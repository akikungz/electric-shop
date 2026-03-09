import type { Locale, PaymentMethod } from "@/types/domain";

export const currency = (value: number, locale: Locale) => {
  return new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);
};

export const paymentLabel = (method: PaymentMethod, locale: Locale) => {
  const en: Record<PaymentMethod, string> = {
    "credit-card": "Credit Card",
    "debit-card": "Debit Card",
    "qr-code": "QR Code",
    cod: "Cash on Delivery",
  };

  const th: Record<PaymentMethod, string> = {
    "credit-card": "บัตรเครดิต",
    "debit-card": "บัตรเดบิต",
    "qr-code": "คิวอาร์โค้ด",
    cod: "เก็บเงินปลายทาง",
  };

  return locale === "th" ? th[method] : en[method];
};

export const mapOrderStatus = (status: string, locale: Locale) => {
  const en: Record<string, string> = {
    pending: "Pending",
    paid: "Paid",
    packed: "Packed",
    shipped: "Shipped",
    delivered: "Delivered",
  };

  const th: Record<string, string> = {
    pending: "รอดำเนินการ",
    paid: "ชำระแล้ว",
    packed: "กำลังแพ็ค",
    shipped: "กำลังจัดส่ง",
    delivered: "จัดส่งสำเร็จ",
  };

  return locale === "th" ? (th[status] ?? status) : (en[status] ?? status);
};
