"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import StarRating from "@/components/common/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteReviewAdmin,
  useSetReviewPublished,
} from "@/hooks/mutations/useReviewAdmin";
import { useAdminProducts } from "@/hooks/queries/useAdminProducts";
import { useAdminReviews } from "@/hooks/queries/useAdminReviews";
import { useCategories } from "@/hooks/queries/useCategories";
import { ApiAdminReview } from "@/types/api/review";

import ReviewFormDialog from "./_components/ReviewFormDialog";

const PAGE_SIZE = 15;

const SORT_OPTIONS = {
  newest: { label: "Newest", sortBy: "createdAt", sortOrder: "desc" },
  oldest: { label: "Oldest", sortBy: "createdAt", sortOrder: "asc" },
  "rating-desc": {
    label: "Highest Rating",
    sortBy: "rating",
    sortOrder: "desc",
  },
  "rating-asc": {
    label: "Lowest Rating",
    sortBy: "rating",
    sortOrder: "asc",
  },
} as const;

type SortKey = keyof typeof SORT_OPTIONS;

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productId, setProductId] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ApiAdminReview | null>(
    null
  );

  const sortOption = SORT_OPTIONS[sortKey];

  const { data: categories } = useCategories();
  const { data: products } = useAdminProducts({
    categoryId: categoryId || undefined,
    limit: 100,
    sortBy: "name",
    sortOrder: "asc",
  });

  const { data, isLoading, isError, refetch } = useAdminReviews({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
    rating: rating ? Number(rating) : undefined,
    isPublished: status ? status === "published" : undefined,
    categoryId: categoryId || undefined,
    productId: productId || undefined,
    sortBy: sortOption.sortBy,
    sortOrder: sortOption.sortOrder,
  });

  const deleteReview = useDeleteReviewAdmin();
  const setPublished = useSetReviewPublished();
  const hasActiveFilters =
    !!search ||
    !!rating ||
    !!status ||
    !!categoryId ||
    !!productId;

  function handleCategoryChange(value: string) {
    setCategoryId(value);
    setProductId("");
    setPage(1);
  }

  function openEdit(review: ApiAdminReview) {
    setEditing(review);
    setDialogOpen(true);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold">
          Reviews
        </h1>
        <p className="text-sm text-muted-foreground">
          Moderate reviews across all products.
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by product, reviewer, or comment..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          className="max-w-xs"
        />

        <select
          value={rating}
          onChange={(event) => {
            setRating(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
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
          <option value="published">Published</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={categoryId}
          onChange={(event) => handleCategoryChange(event.target.value)}
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
          value={productId}
          onChange={(event) => {
            setProductId(event.target.value);
            setPage(1);
          }}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">All Products</option>
          {products?.data.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <select
          value={sortKey}
          onChange={(event) =>
            setSortKey(event.target.value as SortKey)
          }
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {Object.entries(SORT_OPTIONS).map(([key, option]) => (
            <option key={key} value={key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <Loading label="Loading reviews..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load reviews."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState
          title={
            hasActiveFilters
              ? "No reviews match your filters"
              : "No reviews yet"
          }
        />
      )}

      {data && data.data.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-xs text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Reviewer</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Comment</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.data.map((review) => (
                <tr key={review.id}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/shop/${review.product.id}`}
                      target="_blank"
                      className="line-clamp-1 max-w-40 font-medium hover:text-primary"
                    >
                      {review.product.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {review.user.firstName} {review.user.lastName}
                  </td>
                  <td className="px-4 py-3">
                    <StarRating rating={review.rating} />
                  </td>
                  <td className="max-w-60 px-4 py-3">
                    <p className="line-clamp-2 text-muted-foreground">
                      {review.comment ?? "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={setPublished.isPending}
                      onClick={() =>
                        setPublished.mutate({
                          id: review.id,
                          isPublished: !review.isPublished,
                        })
                      }
                    >
                      <Badge
                        className={
                          review.isPublished
                            ? "border-transparent bg-success/10 text-success"
                            : "border-transparent bg-secondary/10 text-secondary"
                        }
                      >
                        {review.isPublished ? "Published" : "Pending"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Edit review"
                        onClick={() => openEdit(review)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label="Delete review"
                        onClick={() =>
                          deleteReview.mutate(review.id)
                        }
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

      <ReviewFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        review={editing}
      />
    </div>
  );
}
