"use client";

import { Facebook, LayoutGrid, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useShop } from "@/context/shop-context";
import { categoryLabels } from "@/data/products";

export function Footer() {
  const { locale } = useShop();

  const text = {
    en: {
      brandDesc:
        "Your trusted destination for premium electronics and home appliances. Quality products, fast delivery, and excellent customer service.",
      quickLinks: "Quick Links",
      categories: "Categories",
      contact: "Contact Us",
      address: "123 Technology Hub, Digital District, Bangkok 10110",
      rights: "All rights reserved.",
      home: "Home",
      profile: "Profile",
      cart: "Cart",
      about: "About Us",
    },
    th: {
      brandDesc:
        "แหล่งรวมเครื่องใช้ไฟฟ้าและสินค้าอิเล็กทรอนิกส์คุณภาพพรีเมียม ส่งตรงถึงบ้านคุณ พร้อมบริการหลังการขายที่ยอดเยี่ยม",
      quickLinks: "เมนูลัด",
      categories: "หมวดหมู่สินค้า",
      contact: "ติดต่อเรา",
      address: "123 ศูนย์กลางเทคโนโลยี เขตดิจิทัล กรุงเทพมหานคร 10110",
      rights: "สงวนลิขสิทธิ์",
      home: "หน้าหลัก",
      profile: "โปรไฟล์",
      cart: "ตะกร้า",
      about: "เกี่ยวกับเรา",
    },
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-900 mt-auto">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col items-start lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 text-white hover:opacity-90 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Electric Shop
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              {text[locale].brandDesc}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-800 p-2.5 text-slate-400 transition-colors hover:bg-blue-600 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-white text-lg tracking-wide">
              {text[locale].quickLinks}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {text[locale].home}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  {text[locale].profile}
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-white transition-colors"
                >
                  {text[locale].cart}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  {text[locale].about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-white text-lg tracking-wide">
              {text[locale].categories}
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/categories/${key}`}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-semibold text-white text-lg tracking-wide">
              {text[locale].contact}
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-slate-500 flex-shrink-0" />
                <span className="leading-snug">{text[locale].address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span>+66-2-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <a
                  href="mailto:support@electricshop.example"
                  className="hover:text-white transition-colors"
                >
                  support@electricshop.example
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Electric Shop. {text[locale].rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
