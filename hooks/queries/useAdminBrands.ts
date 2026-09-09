import { useQuery } from "@tanstack/react-query";

import { getAdminBrands } from "@/services/brand.service";

export function useAdminBrands(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["admin-brands", params],
    queryFn: () => getAdminBrands(params),
  });
}
