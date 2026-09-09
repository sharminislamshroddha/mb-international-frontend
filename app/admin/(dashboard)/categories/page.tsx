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
import { useDeleteCategory, useUpdateCategory } from "@/hooks/mutations/useCategoryAdmin";
import { useAdminCategories } from "@/hooks/queries/useAdminCategories";
import { ApiCategory } from "@/types/api/category";

import CategoryFormDialog from "./_components/CategoryFormDialog";

export default function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ApiCategory | null>(null);

  const { data, isLoading, isError, refetch } = useAdminCategories({
    page,
    limit: 10,
    search: search || undefined,
    sortBy: "name",
    sortOrder: "asc",
  });

  const deleteCategory = useDeleteCategory();
  const updateCategory = useUpdateCategory();

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(category: ApiCategory) {
    setEditing(category);
    setDialogOpen(true);
  }

  function toggleStatus(category: ApiCategory) {
    if (category.isActive) {
      deleteCategory.mutate(category.id);
    } else {
      updateCategory.mutate({
        id: category.id,
        payload: { name: category.name, isActive: true },
      });
    }
  }

  function handleDelete(category: ApiCategory) {
    if (
      window.confirm(
        `Delete "${category.name}"? It will no longer appear in the store.`
      )
    ) {
      deleteCategory.mutate(category.id);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">
            Categories
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your product categories.
          </p>
        </div>

        <Button onClick={openCreate} className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Category
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />
      </div>

      {isLoading && <Loading label="Loading categories..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load categories."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState title="No categories found" />
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.data.map((category) => (
                <tr key={category.id}>
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {category.imageUrl && (
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          fill
                          sizes="40px"
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium">
                      {category.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {category.slug}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleStatus(category)}
                    >
                      <Badge
                        className={
                          category.isActive
                            ? "border-transparent bg-success/10 text-success"
                            : "border-transparent bg-muted text-muted-foreground"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Edit category"
                        onClick={() => openEdit(category)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Delete category"
                        disabled={!category.isActive}
                        onClick={() => handleDelete(category)}
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

      <CategoryFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editing}
      />
    </div>
  );
}
