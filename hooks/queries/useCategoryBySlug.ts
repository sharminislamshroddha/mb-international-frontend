import { useQuery } from "@tanstack/react-query";

import { getCategoryBySlug } from "@/services/category.service";

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ["categories", "slug", slug],
    queryFn: () => getCategoryBySlug(slug),
    enabled: !!slug,
  });
}
