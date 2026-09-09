import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth-store";

export function useMe() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!token,
  });
}
