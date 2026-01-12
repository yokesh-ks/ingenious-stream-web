import React from "react";
import { cn } from "@/lib/utils";

interface MediaRatingProps extends React.HTMLAttributes<HTMLDivElement> {
	average: number;
	count: number;
}

export const MediaRating = React.forwardRef<HTMLDivElement, MediaRatingProps>(
	({ className, average, count, ...props }, ref) => {
		const formatCount = (count: number) => {
			if (count >= 1000000) {
				return `${(count / 1000000).toFixed(1)}M`;
			}
			if (count >= 1000) {
				return `${(count / 1000).toFixed(1)}K`;
			}
			return count.toString();
		};

		return (
			<div ref={ref} className={cn("flex items-center gap-1 text-xs", className)} {...props}>
				<span className="text-yellow-500">★</span>
				<span className="font-medium">{average?.toFixed(1)}</span>
				<span className="text-muted-foreground">({formatCount(count)})</span>
			</div>
		);
	},
);
MediaRating.displayName = "MediaRating";
