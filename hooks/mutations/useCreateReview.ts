import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createReview } from "@/services/review.service";
import { CreateReviewPayload } from "@/types/api/review";

export function useCreateReview(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      createReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-reviews", productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
    },
  });
}
