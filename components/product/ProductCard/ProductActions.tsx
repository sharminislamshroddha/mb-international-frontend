"use client";

import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductActions({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );
  const isWishlisted = useWishlistStore((state) =>
    state.isInWishlist(product.id)
  );

  const outOfStock = product.stock <= 0;

  return (
    <div className="flex items-center gap-2 px-4 pb-4">
      <Button
        size="sm"
        className="flex-1 gap-1.5"
        disabled={outOfStock}
        onClick={() =>
          addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            price: product.salePrice ?? product.price,
            stock: product.stock,
          })
        }
      >
        <ShoppingCart className="h-4 w-4" />
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>

      <Button
        size="icon-sm"
        variant="outline"
        aria-label="Toggle wishlist"
        onClick={() =>
          toggleWishlist({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            price: product.salePrice ?? product.price,
          })
        }
      >
        <Heart
          className={cn(
            "h-4 w-4",
            isWishlisted && "fill-danger text-danger"
          )}
        />
      </Button>
    </div>
  );
}
