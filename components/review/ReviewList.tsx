import StarRating from "@/components/common/StarRating";
import { ApiReview } from "@/types/api/review";

interface Props {
  reviews: ApiReview[];
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reviews yet. Be the first to review this product.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {reviews.map((review) => (
        <div key={review.id} className="flex flex-col gap-1.5 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">
              {review.user.firstName} {review.user.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>

          <StarRating rating={review.rating} />

          {review.title && (
            <p className="text-sm font-medium">{review.title}</p>
          )}

          {review.comment && (
            <p className="text-sm text-muted-foreground">
              {review.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
