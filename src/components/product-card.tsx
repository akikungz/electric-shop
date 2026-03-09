"use client";

import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useShop } from "@/context/shop-context";
import { currency } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/domain";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, locale } = useShop();

  // Mock a random rating for a more realistic UI
  // Note: we'd ideally get this from the backend
  const rating = ((product.id.charCodeAt(0) % 15) / 10 + 3.5).toFixed(1);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border-transparent bg-white/60 backdrop-blur-[6px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-black/5 dark:bg-slate-900/60 dark:hover:border-slate-800 soft-card">
      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <CardHeader className="flex-none p-5 pb-2">
        <div className="mb-2 flex items-center justify-between space-x-2">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20 font-medium rounded-md shadow-none px-2 py-0.5 text-xs"
          >
            {product.category}
          </Badge>
          <div className="flex items-center text-xs font-semibold text-amber-500">
            <Star className="mr-1 h-3.5 w-3.5 fill-current" />
            {rating}
          </div>
        </div>
        <CardTitle className="line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary">
          <Link href={`/product/${product.id}`} className="relative z-[1]">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem] mt-1 text-sm leading-relaxed">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-5 pt-0">
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            {currency(product.price, locale)}
          </span>
          <span className="text-sm font-medium text-muted-foreground line-through opacity-70">
            {currency(product.price * 1.15, locale)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex-none p-5 pt-0 z-10 relative">
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product.id, 1);
          }}
          className={cn(
            "w-full gap-2 rounded-xl border border-transparent transition-all duration-300",
            "bg-foreground text-background shadow-md hover:bg-primary hover:text-primary-foreground hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-primary dark:hover:text-primary-foreground cursor-pointer",
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="font-semibold">
            {locale === "th" ? "เพิ่มลงตะกร้า" : "Add to Cart"}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
