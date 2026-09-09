"use client";

import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteProduct,
  useUpdateProduct,
} from "@/hooks/mutations/useProductAdmin";
import { useAdminProducts } from "@/hooks/queries/useAdminProducts";
import { formatPrice } from "@/lib/format";

const PAGE_SIZE = 10;

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useAdminProducts({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();

  function toggleStatus(product: {
    id: string;
    name: string;
    categoryId: string;
    sku: string;
    price: string;
    stockQuantity: number;
    isActive: boolean;
  }) {
    if (product.isActive) {
      deleteProduct.mutate(product.id);
      return;
    }

    updateProduct.mutate({
      id: product.id,
      payload: {
        categoryId: product.categoryId,
        sku: product.sku,
        name: product.name,
        price: Number(product.price),
        stockQuantity: product.stockQuantity,
        isActive: true,
      },
    });
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Products
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your product catalog.
          </p>
        </div>

        <Button
          render={<Link href="/admin/products/new" />}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading && <Loading label="Loading products..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load products."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState title="No products found" />
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.data.map((product) => {
                const primaryImage =
                  product.images.find((image) => image.isPrimary) ??
                  product.images[0];

                return (
                  <tr key={product.id}>
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {primaryImage && (
                          <Image
                            src={primaryImage.imageUrl}
                            alt={product.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <span className="line-clamp-1 max-w-50 font-medium">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {product.category.name}
                    </td>
                    <td className="px-4 py-3">
                      {formatPrice(Number(product.price))}
                    </td>
                    <td className="px-4 py-3">
                      {product.stockQuantity}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          product.isActive
                            ? "border-transparent bg-success/10 text-success"
                            : "border-transparent bg-muted text-muted-foreground"
                        }
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="icon-sm"
                          variant="outline"
                          aria-label="Edit product"
                          render={
                            <Link
                              href={`/admin/products/${product.id}`}
                            />
                          }
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStatus(product)}
                        >
                          {product.isActive
                            ? "Deactivate"
                            : "Activate"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="p-4">
            <Pagination
              page={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
