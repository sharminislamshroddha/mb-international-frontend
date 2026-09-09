"use client";

import { CheckCircle2, Star } from "lucide-react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateReview } from "@/hooks/mutations/useCreateReview";
import { cn } from "@/lib/utils";

interface Props {
  productId: string;
}

export default function ReviewForm({ productId }: Props) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const createReview = useCreateReview(productId);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createReview.mutate(
      {
        rating,
        title: title || undefined,
        comment: comment || undefined,
      },
      {
        onSuccess: () => {
          setTitle("");
          setComment("");
          setRating(5);
          setSubmitted(true);
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-border p-5"
    >
      <h3 className="font-heading text-base font-semibold">
        Write a Review
      </h3>

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

      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title (optional)"
      />

      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Share your thoughts about this product..."
        rows={3}
        className="rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      {createReview.isError && (
        <p className="text-sm text-destructive">
          {createReview.error?.message ??
            "Failed to submit review."}
        </p>
      )}

      {submitted && (
        <p className="flex items-start gap-2 text-sm text-success">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          Thanks! Your review has been submitted and will appear once
          it&apos;s approved.
        </p>
      )}

      <Button
        type="submit"
        disabled={createReview.isPending}
        className="w-fit"
      >
        {createReview.isPending ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
