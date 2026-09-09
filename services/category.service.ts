import { apiClient } from "@/lib/api/client";
import { mapCategory } from "@/lib/mappers/category.mapper";
import {
  ApiCategory,
  CategoryPayload,
  CategoryQueryParams,
} from "@/types/api/category";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";

export async function getCategories() {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiCategory>
  >("/categories", {
    params: {
      limit: 100,
      isActive: true,
      sortBy: "name",
      sortOrder: "asc",
    },
  });

  return data.data.map(mapCategory);
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();

  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getAdminCategories(
  params?: CategoryQueryParams
) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiCategory>
  >("/categories", { params });

  return data;
}

export async function createCategory(payload: CategoryPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiCategory>
  >("/categories", payload);

  return data.data;
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryPayload>
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiCategory>
  >(`/categories/${id}`, payload);

  return data.data;
}

export async function deleteCategory(id: string) {
  await apiClient.delete(`/categories/${id}`);
}
