"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/hooks/queries/useCategories";
import { useBrands } from "@/hooks/queries/useBrands";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/mutations/useProductAdmin";
import { ApiProduct, ApiProductStatus } from "@/types/api/product";

const STATUS_OPTIONS: ApiProductStatus[] = [
  "DRAFT",
  "ACTIVE",
  "OUT_OF_STOCK",
  "DISCONTINUED",
];

interface Props {
  product?: ApiProduct;
}

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = !!product;

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const mutation = isEdit ? updateProduct : createProduct;

  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? ""
  );
  const [brandId, setBrandId] = useState(product?.brandId ?? "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [name, setName] = useState(product?.name ?? "");
  const [shortDescription, setShortDescription] = useState(
    product?.shortDescription ?? ""
  );
  const [description, setDescription] = useState(
    product?.description ?? ""
  );
  const [price, setPrice] = useState(product?.price ?? "");
  const [salePrice, setSalePrice] = useState(
    product?.salePrice ?? ""
  );
  const [stockQuantity, setStockQuantity] = useState(
    String(product?.stockQuantity ?? 0)
  );
  const [status, setStatus] = useState<ApiProductStatus>(
    product?.status ?? "DRAFT"
  );
  const [isFeatured, setIsFeatured] = useState(
    product?.isFeatured ?? false
  );
  const [isActive, setIsActive] = useState(
    product?.isActive ?? true
  );

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const payload = {
      categoryId,
      brandId: brandId || undefined,
      sku,
      name,
      shortDescription: shortDescription || undefined,
      description: description || undefined,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      stockQuantity: Number(stockQuantity),
      status,
      isFeatured,
      isActive,
    };

    if (isEdit && product) {
      updateProduct.mutate(
        { id: product.id, payload },
        {
          onSuccess: () => router.push("/admin/products"),
        }
      );
      return;
    }

    createProduct.mutate(payload, {
      onSuccess: (created) => {
        router.push(`/admin/products/${created.id}`);
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            required
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="brand" className="text-sm font-medium">
            Brand
          </label>
          <select
            id="brand"
            value={brandId}
            onChange={(event) => setBrandId(event.target.value)}
            className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">None</option>
            {brands?.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sku" className="text-sm font-medium">
            SKU
          </label>
          <Input
            id="sku"
            required
            value={sku}
            onChange={(event) => setSku(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="shortDescription"
          className="text-sm font-medium"
        >
          Short Description
        </label>
        <Input
          id="shortDescription"
          value={shortDescription}
          onChange={(event) =>
            setShortDescription(event.target.value)
          }
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-sm font-medium"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-medium">
            Price (৳)
          </label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="salePrice"
            className="text-sm font-medium"
          >
            Sale Price (৳)
          </label>
          <Input
            id="salePrice"
            type="number"
            min="0"
            step="0.01"
            value={salePrice}
            onChange={(event) => setSalePrice(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="stock" className="text-sm font-medium">
            Stock Quantity
          </label>
          <Input
            id="stock"
            type="number"
            min="0"
            required
            value={stockQuantity}
            onChange={(event) =>
              setStockQuantity(event.target.value)
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ApiProductStatus)
            }
            className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-6 pb-1.5">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) =>
                setIsFeatured(event.target.checked)
              }
              className="h-4 w-4 rounded border-input"
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) =>
                setIsActive(event.target.checked)
              }
              className="h-4 w-4 rounded border-input"
            />
            Active
          </label>
        </div>
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          {mutation.error?.message ?? "Something went wrong."}
        </p>
      )}

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
