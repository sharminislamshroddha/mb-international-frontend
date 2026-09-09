import { useQuery } from "@tanstack/react-query";

import { getAdminCategories } from "@/services/category.service";
import { CategoryQueryParams } from "@/types/api/category";

export function useAdminCategories(params?: CategoryQueryParams) {
  return useQuery({
    queryKey: ["admin-categories", params],
    queryFn: () => getAdminCategories(params),
  });
}
