import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteReview,
  setReviewPublished,
  updateReview,
} from "@/services/review.service";
import { UpdateReviewPayload } from "@/types/api/review";

function useInvalidateReviews() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    queryClient.invalidateQueries({ queryKey: ["product-reviews"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
}

export function useDeleteReviewAdmin() {
  const invalidate = useInvalidateReviews();

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: invalidate,
  });
}

export function useUpdateReviewAdmin() {
  const invalidate = useInvalidateReviews();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateReviewPayload;
    }) => updateReview(id, payload),
    onSuccess: invalidate,
  });
}

export function useSetReviewPublished() {
  const invalidate = useInvalidateReviews();

  return useMutation({
    mutationFn: ({
      id,
      isPublished,
    }: {
      id: string;
      isPublished: boolean;
    }) => setReviewPublished(id, isPublished),
    onSuccess: invalidate,
  });
}
