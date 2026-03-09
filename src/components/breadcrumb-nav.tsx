"use client";

import { ChevronRight, House, MoveLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";

function titleCaseSegment(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const BREADCRUMB_PAGE_PATTERNS = [
  /^\/$/,
  /^\/about$/,
  /^\/cart$/,
  /^\/categories$/,
  /^\/categories\/[^/]+$/,
  /^\/checkout$/,
  /^\/login$/,
  /^\/order$/,
  /^\/order\/[^/]+\/confirmation$/,
  /^\/order\/[^/]+\/tracking$/,
  /^\/product\/[^/]+$/,
  /^\/profile$/,
  /^\/register$/,
  /^\/search$/,
];

function hasPageForHref(href: string) {
  return BREADCRUMB_PAGE_PATTERNS.some((pattern) => pattern.test(href));
}

export function BreadcrumbNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useShop();

  const labels = useMemo(() => {
    return {
      en: {
        home: "Home",
        back: "Back",
        categories: "Categories",
        product: "Product",
        profile: "Profile",
        cart: "Cart",
        checkout: "Checkout",
        order: "Orders",
        tracking: "Tracking",
        confirmation: "Confirmation",
        search: "Search",
        about: "About",
        login: "Login",
        register: "Register",
      },
      th: {
        home: "หน้าแรก",
        back: "ย้อนกลับ",
        categories: "หมวดหมู่",
        product: "สินค้า",
        profile: "โปรไฟล์",
        cart: "ตะกร้า",
        checkout: "ชำระเงิน",
        order: "คำสั่งซื้อ",
        tracking: "ติดตามสถานะ",
        confirmation: "ยืนยันคำสั่งซื้อ",
        search: "ค้นหา",
        about: "เกี่ยวกับ",
        login: "เข้าสู่ระบบ",
        register: "ลงทะเบียน",
      },
    } as const;
  }, []);

  const dictionary = labels[locale];

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const decoded = decodeURIComponent(segment);
    const byKey = dictionary[decoded as keyof typeof dictionary];

    return {
      href,
      label: byKey ?? titleCaseSegment(decoded),
      hasPage: hasPageForHref(href),
      isLast: index === segments.length - 1,
    };
  });

  const canGoBack = pathname !== "/";

  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground dark:text-slate-300 dark:hover:text-slate-100"
        >
          <House className="h-3.5 w-3.5" />
          <span>{dictionary.home}</span>
        </Link>

        {crumbs.map((crumb) => (
          <div key={crumb.href} className="inline-flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/70 dark:text-slate-400" />
            {crumb.isLast ? (
              <span className="rounded-md px-2 py-1 font-medium text-foreground dark:text-slate-100">
                {crumb.label}
              </span>
            ) : crumb.hasPage ? (
              <Link
                href={crumb.href}
                className="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground dark:text-slate-300 dark:hover:text-slate-100"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="cursor-not-allowed rounded-md px-2 py-1 text-muted-foreground/60 dark:text-slate-500"
              >
                {crumb.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit gap-2"
        onClick={() => {
          if (canGoBack) {
            router.back();
            return;
          }
          router.push("/");
        }}
      >
        <MoveLeft className="h-4 w-4" />
        {dictionary.back}
      </Button>
    </div>
  );
}
