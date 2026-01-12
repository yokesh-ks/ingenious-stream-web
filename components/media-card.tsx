import React from "react";
import { cn } from "@/lib/utils";

const MediaCardRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md",
				className,
			)}
			{...props}
		/>
	),
);
MediaCardRoot.displayName = "MediaCardRoot";

const MediaCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn("p-4", className)} {...props} />,
);
MediaCardContent.displayName = "MediaCardContent";

const MediaCardTitle = React.forwardRef<
	HTMLHeadingElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("font-semibold line-clamp-2 group-hover:text-primary text-sm", className)}
		{...props}
	/>
));
MediaCardTitle.displayName = "MediaCardTitle";

const MediaCardExcerpt = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
));
MediaCardExcerpt.displayName = "MediaCardExcerpt";

export const MediaCard = {
	Root: MediaCardRoot,
	Content: MediaCardContent,
	Title: MediaCardTitle,
	Excerpt: MediaCardExcerpt,
};
