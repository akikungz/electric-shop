import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryLabels, products } from "@/data/products";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { Category } from "@/types/domain";
import { CategoryClient } from "./category-client";

const categories = Object.keys(categoryLabels) as Category[];
export const revalidate = 3600;

export async function generateStaticParams() {
  return categories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const resolvedCategory = categories.includes(category as Category)
    ? (category as Category)
    : null;

  if (!resolvedCategory) {
    return {
      title: "Category Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const label = categoryLabels[resolvedCategory];

  return {
    title: `${label} Products`,
    description: `Browse ${label} products at ${SITE_NAME}.`,
    alternates: {
      canonical: `/categories/${resolvedCategory}`,
    },
    openGraph: {
      title: `${label} | ${SITE_NAME}`,
      description: `Browse ${label} products at ${SITE_NAME}.`,
      url: `${SITE_URL}/categories/${resolvedCategory}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const resolvedCategory = categories.includes(category as Category)
    ? (category as Category)
    : null;

  if (!resolvedCategory) {
    return notFound();
  }

  const list = products.filter(
    (product) => product.category === resolvedCategory,
  );

  return (
    <CategoryClient
      category={resolvedCategory}
      categoryLabel={categoryLabels[resolvedCategory]}
      products={list}
    />
  );
}
