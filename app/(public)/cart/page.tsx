"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "@/components/common/Breadcrumb";
import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { formatPrice } from "@/lib/format";
import { useCartStore, useCartTotal } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = useCartTotal();

  return (
    <Container className="py-8 lg:py-12">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Cart" }]}
      />

      <h1 className="mb-8 font-heading text-2xl font-bold lg:text-3xl">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse the shop and add products you love."
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col divide-y divide-border rounded-2xl border border-border">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-4"
              >
                <Link
                  href={`/shop/${item.productId}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="flex flex-1 flex-col gap-1">
                  <Link
                    href={`/shop/${item.productId}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(item.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>

                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label="Increase quantity"
                    disabled={item.quantity >= item.stock}
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <span className="w-24 text-right text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <Button
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Remove item"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex h-fit flex-col gap-4 rounded-2xl border border-border p-6">
            <h2 className="font-heading text-lg font-semibold">
              Order Summary
            </h2>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout.
            </p>

            <Button size="lg" className="mt-2 w-full gap-2" disabled>
              <ShoppingBag className="h-4 w-4" />
              Checkout (coming soon)
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
