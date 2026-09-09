import { useMutation } from "@tanstack/react-query";

import { loginWithGoogle } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useGoogleLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (idToken: string) => loginWithGoogle(idToken),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
}
