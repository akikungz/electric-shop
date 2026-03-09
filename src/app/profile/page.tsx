"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useShop } from "@/context/shop-context";
import { paymentLabel } from "@/lib/format";
import type { UserProfile } from "@/types/domain";

export default function ProfilePage() {
  const {
    locale,
    profile,
    updateProfile,
    cartCount,
    navigate,
    isAuthenticated,
    authLoading,
    logout,
  } = useShop();
  const [draft, setDraft] = useState<UserProfile>(profile);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setDraft(profile);
  }, [profile]);

  if (!authLoading && !isAuthenticated) {
    return (
      <PageShell
        title={locale === "th" ? "โปรไฟล์ผู้ใช้" : "Profile"}
        subtitle={
          locale === "th"
            ? "กรุณาเข้าสู่ระบบก่อนจัดการโปรไฟล์"
            : "Please sign in to manage your profile."
        }
      >
        <div className="soft-card rounded-2xl p-6">
          <div className="flex gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-[#023047] px-4 py-2 font-semibold text-white"
            >
              {locale === "th" ? "เข้าสู่ระบบ" : "Login"}
            </Link>
            <Link
              href="/register"
              className="rounded-lg border border-border px-4 py-2 font-semibold"
            >
              {locale === "th" ? "ลงทะเบียน" : "Register"}
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

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
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage(null);
            setIsSaving(true);
            const result = await updateProfile(draft);
            setIsSaving(false);

            if (!result.success) {
              setErrorMessage(result.message ?? "Cannot save profile");
            }
          }}
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm text-muted-foreground">
              {locale === "th" ? "ชื่อ" : "Name"}
              <input
                value={draft.name}
                onChange={(event) =>
                  setDraft({ ...draft, name: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground">
              {locale === "th" ? "โทรศัพท์" : "Phone"}
              <input
                value={draft.phone}
                onChange={(event) =>
                  setDraft({ ...draft, phone: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground md:col-span-2">
              Email
              <input
                value={draft.email}
                onChange={(event) =>
                  setDraft({ ...draft, email: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground md:col-span-2">
              {locale === "th" ? "ที่อยู่" : "Address"}
              <input
                value={draft.address.line1}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: { ...draft.address, line1: event.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground">
              {locale === "th" ? "เขต/อำเภอ" : "District"}
              <input
                value={draft.address.district}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: { ...draft.address, district: event.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground">
              {locale === "th" ? "จังหวัด" : "Province"}
              <input
                value={draft.address.province}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: { ...draft.address, province: event.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
            <label className="text-sm text-muted-foreground">
              {locale === "th" ? "รหัสไปรษณีย์" : "Postal Code"}
              <input
                value={draft.address.postalCode}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    address: {
                      ...draft.address,
                      postalCode: event.target.value,
                    },
                  })
                }
                className="mt-1 w-full rounded-lg border border-border bg-background/80 px-3 py-2 text-foreground"
              />
            </label>
          </div>

          {errorMessage ? (
            <p className="mt-3 text-sm text-destructive">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSaving}
            className="mt-4 rounded-xl bg-[#023047] px-4 py-2 font-semibold text-white"
          >
            {locale === "th" ? "บันทึกข้อมูล" : "Save Profile"}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="soft-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-foreground">
              {locale === "th" ? "วิธีชำระเงิน" : "Payment Methods"}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {profile.paymentMethods.map((method) => (
                <li
                  key={method}
                  className="rounded-lg border border-border bg-background/70 p-2 text-foreground"
                >
                  {paymentLabel(method, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div className="soft-card rounded-2xl p-5 text-sm text-muted-foreground">
            <p>
              {locale === "th" ? "สินค้าในตะกร้า" : "Cart items"}: {cartCount}
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/order"
                className="rounded-lg border border-border px-3 py-1.5 font-semibold text-foreground"
              >
                {locale === "th" ? "คำสั่งซื้อของฉัน" : "My Orders"}
              </Link>
              <Link
                href="/cart"
                className="rounded-lg bg-[#fb8500] px-3 py-1.5 font-semibold text-white"
              >
                {locale === "th" ? "ดูตะกร้า" : "Open Cart"}
              </Link>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
                className="rounded-lg border border-border px-3 py-1.5 text-foreground"
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
