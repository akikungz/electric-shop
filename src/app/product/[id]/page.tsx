import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { ProductClient } from "./product-client";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Product ${id}`,
    description: `Product details for ${id} at ${SITE_NAME}.`,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title: `${SITE_NAME} Product`,
      description: `Product details for ${id} at ${SITE_NAME}.`,
      url: `${SITE_URL}/product/${id}`,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  return <ProductClient productId={id} />;
}
