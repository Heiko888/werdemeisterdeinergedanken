import { Star } from "./Icon";
import { cn } from "@/lib/cn";

export function StarRating({
  rating = 5,
  className,
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5 text-gold-500", className)}
      role="img"
      aria-label={`${rating} von 5 Sternen`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("text-base", i < rating ? "text-gold-500" : "text-ink/15")}
        />
      ))}
    </div>
  );
}
