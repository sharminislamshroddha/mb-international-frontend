import { apiClient } from "@/lib/api/client";
import { mapProduct } from "@/lib/mappers/product.mapper";
import { ApiPaginatedResponse, ApiSuccessResponse } from "@/types/api/common";
import {
  ApiProduct,
  ApiProductImage,
  ProductImagePayload,
  ProductPayload,
  ProductQueryParams,
} from "@/types/api/product";

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

export async function getAdminProducts(params?: ProductQueryParams) {
  const { data } = await apiClient.get<
    ApiPaginatedResponse<ApiProduct>
  >("/products", { params });

  return data;
}

export async function getAdminProductById(id: string) {
  const { data } = await apiClient.get<
    ApiSuccessResponse<ApiProduct>
  >(`/products/${id}`);

  return data.data;
}

export async function createProduct(payload: ProductPayload) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiProduct>
  >("/products", payload);

  return data.data;
}

export async function updateProduct(
  id: string,
  payload: Partial<ProductPayload>
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiProduct>
  >(`/products/${id}`, payload);

  return data.data;
}

export async function deleteProduct(id: string) {
  await apiClient.delete(`/products/${id}`);
}

export async function addProductImage(
  productId: string,
  payload: ProductImagePayload
) {
  const { data } = await apiClient.post<
    ApiSuccessResponse<ApiProductImage>
  >(`/products/${productId}/images`, payload);

  return data.data;
}

export async function updateProductImage(
  productId: string,
  imageId: string,
  payload: Partial<ProductImagePayload>
) {
  const { data } = await apiClient.patch<
    ApiSuccessResponse<ApiProductImage>
  >(`/products/${productId}/images/${imageId}`, payload);

  return data.data;
}

export async function deleteProductImage(
  productId: string,
  imageId: string
) {
  await apiClient.delete(
    `/products/${productId}/images/${imageId}`
  );
}
