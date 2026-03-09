import type { ReactNode } from "react";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <BreadcrumbNav />
      <Card className="mb-8 border-white/40 bg-[linear-gradient(130deg,#023047_0%,#219ebc_55%,#8ecae6_100%)] text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            {title}
          </CardTitle>
        </CardHeader>
        {subtitle ? (
          <CardContent className="max-w-3xl pt-0 text-sm text-white/85 md:text-base">
            {subtitle}
          </CardContent>
        ) : null}
      </Card>
      {children}
    </main>
  );
}
