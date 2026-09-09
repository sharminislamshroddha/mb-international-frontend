import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/services/user.service";
import { AdminUserQueryParams } from "@/types/api/auth";

export function useAdminUsers(params?: AdminUserQueryParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getUsers(params),
  });
}
