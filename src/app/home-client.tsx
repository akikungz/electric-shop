"use client";

import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop-context";

export function HomeClient() {
  const { locale, products, productsLoading } = useShop();
  const [visibleCount, setVisibleCount] = useState(12);
  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount],
  );

  return (
    <main className="w-full flex-1">
      {/* Premium Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9efff6c623a5?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start px-6 py-20 md:px-12 md:py-32 lg:py-40">
          <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-200 backdrop-blur-md border border-white/20">
            <Zap className="mr-2 h-4 w-4 text-blue-400" />
            {locale === "th" ? "คอลเลกชันใหม่ล่าสุด" : "New Arrival Collection"}
          </div>

          <h1 className="mb-6 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {locale === "th"
              ? "ยกระดับชีวิตด้วยเทคโนโลยีที่ใช่"
              : "Elevate Your Home with Premium Electronics"}
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
            {locale === "th"
              ? "ค้นพบสินค้าคุณภาพสูง คัดสรรมาเพื่อตอบโจทย์ทุกไลฟ์สไตล์ของคุณ พร้อมจัดส่งถึงบ้านอย่างรวดเร็วและปลอดภัย"
              : "Discover curated, high-quality products designed for your lifestyle. Enjoy fast and secure delivery straight to your door."}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
            <Button
              size="lg"
              className="h-14 rounded-full bg-white px-8 text-base font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:bg-slate-100"
              asChild
            >
              <Link href="/categories">
                <Sparkles className="mr-2 h-5 w-5" />
                {locale === "th" ? "เริ่มชอปเลย" : "Shop Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-full border-white/30 bg-white/5 px-8 text-base font-bold text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/about">
                {locale === "th" ? "เรียนรู้เพิ่มเติม" : "Learn More"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content (Products) */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {locale === "th" ? "สินค้าขายดี" : "Trending Products"}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              {locale === "th"
                ? "สินค้าที่ได้รับความนิยมสูงสุดในขณะนี้"
                : "Our most popular items right now"}
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden md:flex font-semibold"
            asChild
          >
            <Link href="/categories">
              {locale === "th" ? "ดูทั้งหมด" : "View All"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {productsLoading ? (
          <p className="text-muted-foreground">
            {locale === "th" ? "กำลังโหลดสินค้า..." : "Loading products..."}
          </p>
        ) : null}

        {!productsLoading && products.length === 0 ? (
          <p className="text-muted-foreground">
            {locale === "th" ? "ยังไม่มีสินค้า" : "No products found."}
          </p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className="fade-in"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {!productsLoading && visibleProducts.length < products.length ? (
          <div className="mt-8 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => setVisibleCount((current) => current + 8)}
            >
              {locale === "th" ? "โหลดเพิ่ม" : "Load More"}
            </Button>
          </div>
        ) : null}

        <div className="mt-10 flex justify-center md:hidden">
          <Button variant="outline" className="w-full font-semibold" asChild>
            <Link href="/categories">
              {locale === "th" ? "ดูทั้งหมด" : "View All"}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
