"use client";

import { Star } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateReviewAdmin } from "@/hooks/mutations/useReviewAdmin";
import { cn } from "@/lib/utils";
import { ApiAdminReview } from "@/types/api/review";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: ApiAdminReview | null;
}

export default function ReviewFormDialog({
  open,
  onOpenChange,
  review,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
        </DialogHeader>

        {review && (
          <ReviewForm
            key={review.id}
            review={review}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ReviewForm({
  review,
  onDone,
}: {
  review: ApiAdminReview;
  onDone: () => void;
}) {
  const updateReview = useUpdateReviewAdmin();

  const [rating, setRating] = useState(review.rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(review.title ?? "");
  const [comment, setComment] = useState(review.comment ?? "");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    updateReview.mutate(
      {
        id: review.id,
        payload: {
          rating,
          title: title || undefined,
          comment: comment || undefined,
        },
      },
      { onSuccess: onDone }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        On <span className="font-medium">{review.product.name}</span>{" "}
        by {review.user.firstName} {review.user.lastName}
      </p>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => {
          const value = index + 1;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  value <= (hoverRating || rating)
                    ? "fill-secondary text-secondary"
                    : "fill-muted text-muted"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="comment" className="text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      {updateReview.isError && (
        <p className="text-sm text-destructive">
          {updateReview.error?.message ?? "Something went wrong."}
        </p>
      )}

      <DialogFooter>
        <Button type="submit" disabled={updateReview.isPending}>
          {updateReview.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}
