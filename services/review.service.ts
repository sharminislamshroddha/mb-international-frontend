import { apiClient } from "@/lib/api/client";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";
import {
  ApiAdminReview,
  ApiReview,
  CreateReviewPayload,
  ReviewQueryParams,
  UpdateReviewPayload,
} from "@/types/api/review";

export async function getAllReviews(params?: ReviewQueryParams) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiAdminReview>
  >("/reviews", { params });

  return data;
}

export async function getProductReviews(
  productId: string,
  params?: { page?: number; limit?: number }
) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiReview>
  >(`/products/${productId}/reviews`, { params });

  return data;
}

export async function createReview(
  productId: string,
  payload: CreateReviewPayload
) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiReview>
  >(`/products/${productId}/reviews`, payload);

  return data.data;
}

export async function updateReview(
  reviewId: string,
  payload: UpdateReviewPayload
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiReview>
  >(`/reviews/${reviewId}`, payload);

  return data.data;
}

export async function deleteReview(reviewId: string) {
  await apiClient.delete(`/reviews/${reviewId}`);
}

export async function setReviewPublished(
  reviewId: string,
  isPublished: boolean
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiAdminReview>
  >(`/reviews/${reviewId}/publish`, { isPublished });

  return data.data;
}
