"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, User, ShoppingCart, Globe, Menu, ChevronDown, LayoutGrid, LogIn, UserPlus, Info } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { categoryLabels } from "@/data/products";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { cartCount, locale, toggleLocale, pathname } = useShop();

  const text = {
    en: {
      logo: "Electric Shop",
      categories: "Categories",
      profile: "Profile",
      cart: "Cart",
      search: "Search",
      login: "Login",
      register: "Register",
      about: "About",
    },
    th: {
      logo: "ร้านเครื่องใช้ไฟฟ้า",
      categories: "หมวดหมู่",
      profile: "โปรไฟล์",
      cart: "ตะกร้า",
      search: "ค้นหา",
      login: "เข้าสู่ระบบ",
      register: "ลงทะเบียน",
      about: "เกี่ยวกับเรา",
    },
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center gap-6">
          <Button
            asChild
            variant="link"
            className="h-auto px-0 text-xl font-bold tracking-tight text-foreground hover:no-underline"
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <span className="hidden sm:inline-block font-display">{text[locale].logo}</span>
            </Link>
          </Button>

          <Separator orientation="vertical" className="hidden h-6 md:block opacity-50" />

          {/* Categories Dropdown */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 font-medium">
                  <Menu className="h-4 w-4" />
                  {text[locale].categories}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background/95 backdrop-blur-xl border-white/20 shadow-xl">
                <DropdownMenuItem asChild className="rounded-md cursor-pointer hover:bg-muted/50">
                  <Link href="/categories" className="w-full">
                    All Categories
                  </Link>
                </DropdownMenuItem>
                <Separator className="my-1" />
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <DropdownMenuItem key={key} asChild className="rounded-md cursor-pointer hover:bg-muted/50">
                    <Link href={`/categories/${key}`} className="w-full">
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Right side navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            asChild
            size="icon"
            variant={pathname === "/search" ? "secondary" : "ghost"}
            className="rounded-full w-9 h-9 transition-colors"
            title={text[locale].search}
          >
            <Link href="/search">
              <Search className="h-4 w-4" />
              <span className="sr-only">{text[locale].search}</span>
            </Link>
          </Button>

          {/* Account/User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant={pathname === "/profile" ? "secondary" : "ghost"} className="rounded-full w-9 h-9 transition-colors">
                <User className="h-4 w-4" />
                <span className="sr-only">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-white/20 shadow-xl">
              <DropdownMenuItem asChild className="rounded-md cursor-pointer">
                <Link href="/profile" className="flex items-center gap-3 w-full">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{text[locale].profile}</span>
                </Link>
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem asChild className="rounded-md cursor-pointer">
                <Link href="/login" className="flex items-center gap-3 w-full">
                  <LogIn className="h-4 w-4 text-muted-foreground" /> {text[locale].login}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-md cursor-pointer">
                <Link href="/register" className="flex items-center gap-3 w-full">
                  <UserPlus className="h-4 w-4 text-muted-foreground" /> {text[locale].register}
                </Link>
              </DropdownMenuItem>
               <Separator className="my-1" />
              <DropdownMenuItem asChild className="rounded-md cursor-pointer">
                <Link href="/about" className="flex items-center gap-3 w-full">
                  <Info className="h-4 w-4 text-muted-foreground" /> {text[locale].about}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            variant={pathname === "/cart" ? "secondary" : "ghost"}
            className={cn("gap-2 rounded-full px-4 transition-all duration-200", pathname === "/cart" && "bg-primary text-primary-foreground hover:bg-primary/90")}
          >
            <Link href="/cart">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">{text[locale].cart}</span>
              {cartCount > 0 && (
                <Badge variant="destructive" className="ml-1 px-1.5 py-0 min-w-[1.25rem] h-5 rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
          
          <Separator orientation="vertical" className="hidden sm:block h-5 opacity-30 mx-1" />

          <Button
            type="button"
            onClick={toggleLocale}
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 relative hover:bg-secondary/80"
            title="Toggle Language"
          >
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">{locale === "en" ? "TH" : "EN"}</span>
            <span className="absolute bottom-1 right-1 text-[9px] font-bold leading-none uppercase text-primary">{locale}</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
