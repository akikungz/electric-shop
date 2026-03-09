"use client";

import Image from "next/image";
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
    <span className={cn("relative block h-full w-full", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
        className="object-cover"
        onError={() => {
          if (imageSrc !== DEFAULT_PRODUCT_IMAGE) {
            setImageSrc(DEFAULT_PRODUCT_IMAGE);
          }
        }}
      />
    </span>
  );
}
