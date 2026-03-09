"use client";

import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";

export default function AboutPage() {
  const { locale } = useShop();

  return (
    <PageShell
      title={locale === "th" ? "เกี่ยวกับ Electric Shop" : "About Electric Shop"}
      subtitle={
        locale === "th"
          ? "ติดต่อทีมงานผ่านช่องทางด้านล่าง"
          : "Reach out through any channel below."
      }
    >
      <section className="soft-card grid gap-4 rounded-2xl p-6 text-[#334856] md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-[#0d1b2a]">Contact</h2>
          <p className="mt-2 text-sm">
            Support Center, Electric Shop Co., Ltd.
          </p>
          <p className="text-sm">Phone: +66 2 123 4567</p>
          <p className="text-sm">Email: support@electricshop.example</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#0d1b2a]">Address</h2>
          <p className="mt-2 text-sm">88 Rama IX Road, Huai Khwang</p>
          <p className="text-sm">Bangkok 10310, Thailand</p>
          <a
            className="mt-2 inline-block text-sm font-semibold text-[#219ebc]"
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            Facebook Page
          </a>
        </div>
      </section>
    </PageShell>
  );
}
