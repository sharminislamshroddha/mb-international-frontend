import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createBrand,
  deleteBrand,
  updateBrand,
} from "@/services/brand.service";
import { BrandPayload } from "@/types/api/product";

function useInvalidateBrands() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["admin-brands"] });
    queryClient.invalidateQueries({ queryKey: ["brands"] });
  };
}

export function useCreateBrand() {
  const invalidate = useInvalidateBrands();

  return useMutation({
    mutationFn: (payload: BrandPayload) => createBrand(payload),
    onSuccess: invalidate,
  });
}

export function useUpdateBrand() {
  const invalidate = useInvalidateBrands();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<BrandPayload>;
    }) => updateBrand(id, payload),
    onSuccess: invalidate,
  });
}

export function useDeleteBrand() {
  const invalidate = useInvalidateBrands();

  return useMutation({
    mutationFn: (id: string) => deleteBrand(id),
    onSuccess: invalidate,
  });
}
