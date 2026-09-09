import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/services/product.service";
import { ProductQueryParams } from "@/types/api/product";

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}
