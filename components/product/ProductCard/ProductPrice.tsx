import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  className?: string;
}

export default function ProductPrice({ product, className }: Props) {
  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className="text-base font-semibold text-foreground">
        {formatPrice(product.salePrice ?? product.price)}
      </span>

      {product.salePrice !== undefined && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(product.price)}
        </span>
      )}
    </div>
  );
}
