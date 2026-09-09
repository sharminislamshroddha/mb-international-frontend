import { useMutation } from "@tanstack/react-query";

import { loginWithFacebook } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useFacebookLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (accessToken: string) =>
      loginWithFacebook(accessToken),
    onSuccess: ({ user, token }) => setAuth(user, token),
  });
}
