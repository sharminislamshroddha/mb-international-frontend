"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { useBrands } from "@/hooks/queries/useBrands";
import { useCategories } from "@/hooks/queries/useCategories";
import { formatPrice } from "@/lib/format";
import { ApiProductStatus } from "@/types/api/product";

const PAGE_SIZE = 10;

const STATUS_OPTIONS: ApiProductStatus[] = [
  "DRAFT",
  "ACTIVE",
  "OUT_OF_STOCK",
  "DISCONTINUED",
];

interface ProductRow {
  id: string;
  name: string;
  categoryId: string;
  sku: string;
  price: string;
  stockQuantity: number;
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [status, setStatus] = useState("");
  const [activeStatus, setActiveStatus] = useState("");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const { data, isLoading, isError, refetch } = useAdminProducts({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    categoryId: categoryId || undefined,
    brandId: brandId || undefined,
    status: (status as ApiProductStatus) || undefined,
    isActive: activeStatus ? activeStatus === "active" : undefined,
    isFeatured: featuredOnly || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const hasActiveFilters =
    !!search ||
    !!categoryId ||
    !!brandId ||
    !!status ||
    !!activeStatus ||
    featuredOnly ||
    !!minPrice ||
    !!maxPrice;

  function resetFilters() {
    setSearch("");
    setCategoryId("");
    setBrandId("");
    setStatus("");
    setActiveStatus("");
    setFeaturedOnly(false);
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  }

  function toggleStatus(product: ProductRow) {
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

  function handleDelete(product: ProductRow) {
    if (
      window.confirm(
        `Delete "${product.name}"? It will no longer appear in the store.`
      )
    ) {
      deleteProduct.mutate(product.id);
    }
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
          nativeButton={false}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by name, SKU, or description..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />

        <select
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={brandId}
          onChange={(event) => {
            setBrandId(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Brands</option>
          {brands?.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option.replace("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={activeStatus}
          onChange={(event) => {
            setActiveStatus(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Active & Inactive</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>

        <label className="flex h-9 items-center gap-2 rounded-lg border border-input px-2.5 text-sm">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(event) => {
              setFeaturedOnly(event.target.checked);
              setPage(1);
            }}
            className="h-4 w-4 rounded border-input"
          />
          Featured only
        </label>

        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            min="0"
            placeholder="Min ৳"
            value={minPrice}
            onChange={(event) => {
              setMinPrice(event.target.value);
              setPage(1);
            }}
            className="w-24"
          />
          <span className="text-sm text-muted-foreground">–</span>
          <Input
            type="number"
            min="0"
            placeholder="Max ৳"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value);
              setPage(1);
            }}
            className="w-24"
          />
        </div>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {isLoading && <Loading label="Loading products..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load products."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState
          title={
            hasActiveFilters
              ? "No products match your filters"
              : "No products found"
          }
        />
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
                            unoptimized
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
                      <button
                        type="button"
                        onClick={() => toggleStatus(product)}
                      >
                        <Badge
                          className={
                            product.isActive
                              ? "border-transparent bg-success/10 text-success"
                              : "border-transparent bg-muted text-muted-foreground"
                          }
                        >
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </button>
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
                          nativeButton={false}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          size="icon-sm"
                          variant="outline"
                          aria-label="Delete product"
                          disabled={!product.isActive}
                          onClick={() => handleDelete(product)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
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
