import { useQuery } from "@tanstack/react-query";

import { getProductReviews } from "@/services/review.service";

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => getProductReviews(productId),
    enabled: !!productId,
  });
}
