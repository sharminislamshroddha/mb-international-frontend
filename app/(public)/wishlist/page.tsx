"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "@/components/common/Breadcrumb";
import EmptyState from "@/components/common/EmptyState";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addItem);

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        Your Wishlist
      </h1>

      {items.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Tap the heart icon on any product to save it here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Link
                href={`/shop/${item.productId}`}
                className="relative aspect-square w-full bg-muted"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                )}
              </Link>

              <div className="flex flex-1 flex-col gap-2 p-4">
                <Link
                  href={`/shop/${item.productId}`}
                  className="line-clamp-2 text-sm font-medium hover:text-primary"
                >
                  {item.name}
                </Link>

                <span className="text-sm font-semibold">
                  {formatPrice(item.price)}
                </span>

                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5"
                    onClick={() =>
                      addToCart({
                        productId: item.productId,
                        name: item.name,
                        slug: item.slug,
                        image: item.image,
                        price: item.price,
                        stock: 1,
                      })
                    }
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>

                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label="Remove from wishlist"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
