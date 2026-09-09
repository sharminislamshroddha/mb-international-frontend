import { useMutation } from "@tanstack/react-query";

import { login, LoginPayload } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
}
