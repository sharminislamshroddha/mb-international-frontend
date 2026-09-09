import { useQuery } from "@tanstack/react-query";

import { getAdminProducts } from "@/services/product.service";
import { ProductQueryParams } from "@/types/api/product";

export function useAdminProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: () => getAdminProducts(params),
  });
}
