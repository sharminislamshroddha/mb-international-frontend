import { useQuery } from "@tanstack/react-query";

import { getAdminProductById } from "@/services/product.service";

export function useAdminProduct(id: string) {
  return useQuery({
    queryKey: ["admin-products", id],
    queryFn: () => getAdminProductById(id),
    enabled: !!id,
  });
}
