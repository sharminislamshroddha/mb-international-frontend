"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteBrand, useUpdateBrand } from "@/hooks/mutations/useBrandAdmin";
import { useAdminBrands } from "@/hooks/queries/useAdminBrands";
import { ApiBrand } from "@/types/api/product";

import BrandFormDialog from "./_components/BrandFormDialog";

export default function AdminBrandsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ApiBrand | null>(null);

  const { data, isLoading, isError, refetch } = useAdminBrands({
    page,
    limit: 10,
    search: search || undefined,
  });

  const deleteBrand = useDeleteBrand();
  const updateBrand = useUpdateBrand();

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(brand: ApiBrand) {
    setEditing(brand);
    setDialogOpen(true);
  }

  function toggleStatus(brand: ApiBrand) {
    if (brand.isActive) {
      deleteBrand.mutate(brand.id);
    } else {
      updateBrand.mutate({
        id: brand.id,
        payload: { name: brand.name, isActive: true },
      });
    }
  }

  function handleDelete(brand: ApiBrand) {
    if (
      window.confirm(
        `Delete "${brand.name}"? It will no longer appear in the store.`
      )
    ) {
      deleteBrand.mutate(brand.id);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Brands
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage the brands sold in your store.
          </p>
        </div>

        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Brand
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search brands..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading && <Loading label="Loading brands..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load brands."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState title="No brands found" />
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.data.map((brand) => (
                <tr key={brand.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {brand.logoUrl && (
                        <Image
                          src={brand.logoUrl}
                          alt={brand.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium">
                      {brand.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {brand.slug}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleStatus(brand)}
                    >
                      <Badge
                        className={
                          brand.isActive
                            ? "border-transparent bg-success/10 text-success"
                            : "border-transparent bg-muted text-muted-foreground"
                        }
                      >
                        {brand.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Edit brand"
                        onClick={() => openEdit(brand)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Delete brand"
                        disabled={!brand.isActive}
                        onClick={() => handleDelete(brand)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
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

      <BrandFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        brand={editing}
      />
    </div>
  );
}
