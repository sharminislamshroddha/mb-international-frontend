"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import { useAdminProduct } from "@/hooks/queries/useAdminProduct";

import ProductForm from "../_components/ProductForm";
import ProductImageManager from "../_components/ProductImageManager";

interface Props {
  id: string;
}

export default function EditProductClient({ id }: Props) {
  const { data: product, isLoading, isError, refetch } =
    useAdminProduct(id);

  if (isLoading) {
    return <Loading label="Loading product..." />;
  }

  if (isError || !product) {
    return (
      <ErrorMessage
        message="Failed to load this product."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="mb-1 font-heading text-2xl font-bold">
          Edit Product
        </h1>
        <p className="text-sm text-muted-foreground">
          {product.name}
        </p>
      </div>

      <ProductForm product={product} />

      <ProductImageManager
        productId={product.id}
        images={product.images}
      />
    </div>
  );
}
