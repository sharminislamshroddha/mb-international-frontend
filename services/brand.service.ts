import { apiClient } from "@/lib/api/client";
import { ApiPaginatedResponse } from "@/types/api/common";
import { ApiBrand } from "@/types/api/product";

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
