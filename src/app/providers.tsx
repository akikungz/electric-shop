"use client";

import type { ReactNode } from "react";
import { ShopProvider } from "@/context/shop-context";

export function Providers({ children }: { children: ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}
