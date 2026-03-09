"use client";

import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShop } from "@/context/shop-context";
import { categoryLabels } from "@/data/products";

export default function CategoriesPage() {
  const { locale } = useShop();

  return (
    <PageShell
      title={locale === "th" ? "หมวดหมู่สินค้า" : "Categories"}
      subtitle={
        locale === "th"
          ? "เลือกหมวดหมู่ที่ต้องการ"
          : "Pick a category to browse products."
      }
    >
      <section className="grid gap-4 sm:grid-cols-2">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Link
            key={key}
            href={`/categories/${key}`}
            className="transition hover:-translate-y-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                {locale === "th" ? "ดูสินค้าทั้งหมด" : "Browse all products"}
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
