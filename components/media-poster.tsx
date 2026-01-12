import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { tmdbImage } from "@/lib/tmdb/utils/image";

interface MediaPosterProps extends React.HTMLAttributes<HTMLDivElement> {
	image?: string;
	alt: string;
	size?: "w154" | "w185" | "w342" | "w500" | "w780";
}

export const MediaPoster = React.forwardRef<HTMLDivElement, MediaPosterProps>(
	({ className, image, alt, size = "w342", ...props }, ref) => {
		const imageUrl = image ? tmdbImage.url(image, size) : null;

		if (!imageUrl) {
			return (
				<div
					ref={ref}
					className={cn("aspect-[2/3] rounded-md border bg-muted text-muted-foreground", className)}
					{...props}
				>
					<div className="grid size-full place-items-center">
						<div className="text-4xl">🎬</div>
					</div>
				</div>
			);
		}

		return (
			<div ref={ref} className={cn("aspect-[2/3] relative", className)} {...props}>
				<Image
					src={imageUrl}
					alt={alt}
					fill
					className="object-cover transition-transform group-hover:scale-105"
					sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
				/>
			</div>
		);
	},
);
MediaPoster.displayName = "MediaPoster";
