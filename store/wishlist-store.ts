import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (item) => {
        const exists = get().items.some(
          (i) => i.productId === item.productId
        );

        set({
          items: exists
            ? get().items.filter(
                (i) => i.productId !== item.productId
              )
            : [...get().items, item],
        });
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter(
            (i) => i.productId !== productId
          ),
        }),

      isInWishlist: (productId) =>
        get().items.some((i) => i.productId === productId),
    }),
    {
      name: "mb-wishlist-storage",
    }
  )
);

export function useWishlistCount() {
  return useWishlistStore((state) => state.items.length);
}
