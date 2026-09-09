import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductBadge({ product }: Props) {
  const outOfStock = product.stock <= 0;

  if (!product.isOnSale && !product.isNew && !outOfStock) {
    return null;
  }

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
      {outOfStock && (
        <Badge className="border-transparent bg-foreground text-background">
          Out of Stock
        </Badge>
      )}

      {!outOfStock && product.isOnSale && (
        <Badge className="border-transparent bg-danger text-white">
          Sale
        </Badge>
      )}

      {!outOfStock && !product.isOnSale && product.isNew && (
        <Badge className="border-transparent bg-secondary text-secondary-foreground">
          New
        </Badge>
      )}
    </div>
  );
}
