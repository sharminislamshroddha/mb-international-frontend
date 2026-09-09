"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import EmptyState from "@/components/common/EmptyState";
import ErrorMessage from "@/components/common/ErrorMessage";
import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import StarRating from "@/components/common/StarRating";
import { Button } from "@/components/ui/button";
import { useDeleteReviewAdmin } from "@/hooks/mutations/useReviewAdmin";
import { useAdminReviews } from "@/hooks/queries/useAdminReviews";
import { ApiAdminReview } from "@/types/api/review";

import ReviewFormDialog from "./_components/ReviewFormDialog";

const PAGE_SIZE = 15;

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ApiAdminReview | null>(
    null
  );

  const { data, isLoading, isError, refetch } = useAdminReviews({
    page,
    limit: PAGE_SIZE,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const deleteReview = useDeleteReviewAdmin();

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

      {isLoading && <Loading label="Loading reviews..." />}

      {isError && (
        <ErrorMessage
          message="Failed to load reviews."
          onRetry={() => refetch()}
        />
      )}

      {data && data.data.length === 0 && (
        <EmptyState title="No reviews yet" />
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
