import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ApiUser } from "@/types/api/auth";

interface AuthState {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: ApiUser, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "mb-auth-storage",
    }
  )
);
