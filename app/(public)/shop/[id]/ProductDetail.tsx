"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

import Breadcrumb from "@/components/common/Breadcrumb";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import StarRating from "@/components/common/StarRating";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ReviewForm from "@/components/review/ReviewForm";
import ReviewList from "@/components/review/ReviewList";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/queries/useProduct";
import { useProductReviews } from "@/hooks/queries/useProductReviews";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface Props {
  id: string;
}

export default function ProductDetail({ id }: Props) {
  const { data: product, isLoading, isError } = useProduct(id);
  const { data: reviewsData } = useProductReviews(id);
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleItem
  );
  const isWishlisted = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (isLoading) {
    return <Loading label="Loading product..." />;
  }

  if (isError) {
    return <ErrorMessage message="Failed to load this product." />;
  }

  if (!product) {
    notFound();
  }

  const outOfStock = product.stock <= 0;

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          {
            label: product.category,
            href: `/categories/${product.categorySlug}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-4">
          {product.brand && (
            <span className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
              {product.brand}
            </span>
          )}

          <h1 className="font-heading text-2xl font-bold lg:text-3xl">
            {product.name}
          </h1>

          {product.reviewCount > 0 && (
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              size="md"
            />
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.salePrice ?? product.price)}
            </span>
            {product.salePrice !== undefined && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-muted-foreground">
              {product.shortDescription}
            </p>
          )}

          <p
            className={cn(
              "text-sm font-medium",
              outOfStock ? "text-destructive" : "text-success"
            )}
          >
            {outOfStock
              ? "Out of Stock"
              : `In Stock (${product.stock} available)`}
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-input">
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>

              <span className="w-10 text-center text-sm font-medium">
                {quantity}
              </span>

              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((current) =>
                    Math.min(product.stock, current + 1)
                  )
                }
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 gap-2"
              disabled={outOfStock}
              onClick={() =>
                addToCart(
                  {
                    productId: product.id,
                    name: product.name,
                    slug: product.slug,
                    image: product.image,
                    price: product.salePrice ?? product.price,
                    stock: product.stock,
                  },
                  quantity
                )
              }
            >
              <ShoppingCart className="h-4 w-4" />
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <Button
              size="icon-lg"
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

          {product.description && (
            <div className="mt-4 border-t border-border pt-4">
              <h2 className="mb-2 font-heading text-base font-semibold">
                Description
              </h2>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-4 font-heading text-xl font-semibold">
            Customer Reviews
            {product.reviewCount > 0 && ` (${product.reviewCount})`}
          </h2>
          <ReviewList reviews={reviewsData?.data ?? []} />
        </div>

        <div>
          {isAuthenticated ? (
            <ReviewForm productId={product.id} />
          ) : (
            <div className="rounded-2xl border border-border p-5 text-sm text-muted-foreground">
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </Link>{" "}
              to write a review.
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
