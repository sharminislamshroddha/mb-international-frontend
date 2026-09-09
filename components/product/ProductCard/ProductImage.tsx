import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductImage({ product }: Props) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="relative block aspect-square w-full overflow-hidden bg-muted"
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          <ImageOff className="h-10 w-10" />
        </div>
      )}
    </Link>
  );
}
