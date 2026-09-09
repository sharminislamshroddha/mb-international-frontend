import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  stock: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.productId === item.productId
        );

        if (existing) {
          set({
            items: items.map((i) =>
              i.productId === item.productId
                ? {
                    ...i,
                    quantity: Math.min(
                      i.quantity + quantity,
                      i.stock
                    ),
                  }
                : i
            ),
          });
          return;
        }

        set({
          items: [
            ...items,
            { ...item, quantity: Math.min(quantity, item.stock) },
          ],
        });
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter(
            (i) => i.productId !== productId
          ),
        }),

      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? {
                  ...i,
                  quantity: Math.max(1, Math.min(quantity, i.stock)),
                }
              : i
          ),
        }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "mb-cart-storage",
    }
  )
);

export function useCartCount() {
  return useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
}

export function useCartTotal() {
  return useCartStore((state) =>
    state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  );
}
