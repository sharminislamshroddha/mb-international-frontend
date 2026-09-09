import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
  rating: number;
  size?: "sm" | "md";
  reviewCount?: number;
  className?: string;
}

export default function StarRating({
  rating,
  size = "sm",
  reviewCount,
  className,
}: Props) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              starSize,
              index < Math.round(rating)
                ? "fill-secondary text-secondary"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>

      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount})`}
      </span>
    </div>
  );
}
