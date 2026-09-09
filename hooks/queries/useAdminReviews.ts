import { useQuery } from "@tanstack/react-query";

import { getAllReviews } from "@/services/review.service";
import { ReviewQueryParams } from "@/types/api/review";

export function useAdminReviews(params?: ReviewQueryParams) {
  return useQuery({
    queryKey: ["admin-reviews", params],
    queryFn: () => getAllReviews(params),
  });
}
