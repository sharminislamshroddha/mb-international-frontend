import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteReview } from "@/services/review.service";

export function useDeleteReviewAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
