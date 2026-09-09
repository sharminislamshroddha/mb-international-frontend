import { Product } from "@/types/product";

import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <ProductBadge product={product} />
      <ProductImage product={product} />

      <div className="flex flex-1 flex-col justify-between gap-3 pt-3">
        <ProductInfo product={product} />
        <ProductActions product={product} />
      </div>
    </div>
  );
}
