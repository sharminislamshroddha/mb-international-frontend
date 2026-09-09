import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addProductImage,
  deleteProductImage,
  updateProductImage,
} from "@/services/product.service";
import { ProductImagePayload } from "@/types/api/product";

function useInvalidateProduct(productId: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: ["admin-products", productId],
    });
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
}

export function useAddProductImage(productId: string) {
  const invalidate = useInvalidateProduct(productId);

  return useMutation({
    mutationFn: (payload: ProductImagePayload) =>
      addProductImage(productId, payload),
    onSuccess: invalidate,
  });
}

export function useUpdateProductImage(productId: string) {
  const invalidate = useInvalidateProduct(productId);

  return useMutation({
    mutationFn: ({
      imageId,
      payload,
    }: {
      imageId: string;
      payload: Partial<ProductImagePayload>;
    }) => updateProductImage(productId, imageId, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteProductImage(productId: string) {
  const invalidate = useInvalidateProduct(productId);

  return useMutation({
    mutationFn: (imageId: string) =>
      deleteProductImage(productId, imageId),
    onSuccess: invalidate,
  });
}
