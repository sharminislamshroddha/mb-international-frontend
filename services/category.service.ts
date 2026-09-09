import { apiClient } from "@/lib/api/client";
import { mapCategory } from "@/lib/mappers/category.mapper";
import { ApiCategory } from "@/types/api/category";
import { ApiPaginatedResponse } from "@/types/api/common";

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
