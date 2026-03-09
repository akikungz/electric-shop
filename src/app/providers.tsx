"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast-provider";
import { ShopProvider } from "@/context/shop-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ShopProvider>{children}</ShopProvider>
    </ToastProvider>
  );
}
