"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { useCartCount } from "@/store/cart-store";

export default function CartButton() {
  const count = useCartCount();

  return (
    <Link
      href="/cart"
      aria-label="View cart"
      className="relative flex items-center text-foreground hover:text-primary"
    >
      <ShoppingCart className="h-5 w-5" />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
