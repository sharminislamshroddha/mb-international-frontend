import { apiClient } from "@/lib/api/client";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";
import { ApiBrand, BrandPayload } from "@/types/api/product";

export async function getBrands() {
  const { data } = await apiClient.get<ApiPaginatedResponse<ApiBrand>>(
    "/brands",
    {
      params: {
        limit: 100,
        isActive: true,
        sortBy: "name",
        sortOrder: "asc",
      },
    }
  );

  return data.data;
}

export async function getAdminBrands(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiBrand>
  >("/brands", { params });

  return data;
}

export async function createBrand(payload: BrandPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiBrand>
  >("/brands", payload);

  return data.data;
}

export async function updateBrand(
  id: string,
  payload: Partial<BrandPayload>
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiBrand>
  >(`/brands/${id}`, payload);

  return data.data;
}

export async function deleteBrand(id: string) {
  await apiClient.delete(`/brands/${id}`);
}
