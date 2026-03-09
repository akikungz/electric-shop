"use client";

import { useState } from "react";
import { DEFAULT_PRODUCT_IMAGE } from "@/lib/product-image";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src || DEFAULT_PRODUCT_IMAGE);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
      onError={() => {
        if (imageSrc !== DEFAULT_PRODUCT_IMAGE) {
          setImageSrc(DEFAULT_PRODUCT_IMAGE);
        }
      }}
    />
  );
}
