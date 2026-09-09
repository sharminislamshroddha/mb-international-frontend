import { apiClient } from "@/lib/api/client";
import { mapProduct } from "@/lib/mappers/product.mapper";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";
import { ApiProduct, ProductQueryParams } from "@/types/api/product";

export async function getProducts(params?: ProductQueryParams) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiProduct>
  >("/products", { params });

  return {
    items: data.data.map(mapProduct),
    meta: data.meta,
  };
}

export async function getProductById(id: string) {
  const { data } = await apiClient.get<
    ApiSuccessResponse<ApiProduct>
  >(`/products/${id}`);

  return mapProduct(data.data);
}
