"use client";

import Link from "next/link";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { paymentLabel } from "@/lib/format";
import type { UserProfile } from "@/types/domain";

export default function ProfilePage() {
  const { locale, profile, updateProfile, cartCount, clearCart, navigate } =
    useShop();
  const [draft, setDraft] = useState<UserProfile>(profile);

  return (
    <PageShell
      title={locale === "th" ? "โปรไฟล์ผู้ใช้" : "Profile"}
      subtitle={
        locale === "th"
          ? "จัดการข้อมูลบัญชีและการชำระเงิน"
          : "Manage account details and payment preferences."
      }
    >
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <form
          className="soft-card rounded-2xl p-6"
          onSubmit={(event) => {
            event.preventDefault();
            updateProfile(draft);
          }}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-[#335168]">
              {locale === "th" ? "ชื่อ" : "Name"}
              <input
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2"
              />
            </label>
            <label className="text-sm text-[#335168]">
              {locale === "th" ? "โทรศัพท์" : "Phone"}
              <input
                value={draft.phone}
                onChange={(event) =>
                  setDraft({ ...draft, phone: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2"
              />
            </label>
            <label className="text-sm text-[#335168] md:col-span-2">
              Email
              <input
                value={draft.email}
                onChange={(event) =>
                  setDraft({ ...draft, email: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2"
              />
            </label>
            <label className="text-sm text-[#335168] md:col-span-2">
              {locale === "th" ? "ที่อยู่" : "Address"}
              <input
                value={draft.address.line1}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: { ...draft.address, line1: event.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-[#023047] px-4 py-2 font-semibold text-white"
          >
            {locale === "th" ? "บันทึกข้อมูล" : "Save Profile"}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="soft-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-[#0d1b2a]">
              {locale === "th" ? "วิธีชำระเงิน" : "Payment Methods"}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#334856]">
              {profile.paymentMethods.map((method) => (
                <li key={method} className="rounded-lg bg-white p-2">
                  {paymentLabel(method, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div className="soft-card rounded-2xl p-5 text-sm text-[#334856]">
            <p>
              {locale === "th" ? "สินค้าในตะกร้า" : "Cart items"}: {cartCount}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/cart"
                className="rounded-lg bg-[#fb8500] px-3 py-1.5 font-semibold text-white"
              >
                {locale === "th" ? "ดูตะกร้า" : "Open Cart"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  navigate("/");
                }}
                className="rounded-lg border border-black/15 px-3 py-1.5"
              >
                {locale === "th" ? "ออกจากระบบ" : "Sign Out"}
              </button>
            </div>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
