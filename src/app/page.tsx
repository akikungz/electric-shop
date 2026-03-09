import type { Metadata } from "next";
import { products } from "@/data/products";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { HomeClient } from "./home-client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Home",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
  },
};

export default function HomePage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${product.id}`,
      name: product.name,
    })),
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>
      <HomeClient products={products} />
    </>
  );
}
