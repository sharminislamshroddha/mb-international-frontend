import { Star } from "lucide-react";
import Link from "next/link";

import { Product } from "@/types/product";

import ProductPrice from "./ProductPrice";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  return (
    <div className="flex flex-col gap-1.5 px-4">
      {product.brand && (
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {product.brand}
        </span>
      )}

      <Link href={`/shop/${product.id}`}>
        <h3 className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary">
          {product.name}
        </h3>
      </Link>

      {product.reviewCount > 0 && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>
      )}

      <ProductPrice product={product} />
    </div>
  );
}
