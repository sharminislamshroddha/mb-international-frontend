import { useMutation } from "@tanstack/react-query";

import { register, RegisterPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
}
