"use client";

import { X, Play, ExternalLink, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Movie } from "../../actions";

interface MovieDetailsModalProps {
	movie: Movie;
	language: string;
	onClose: () => void;
}

export default function MovieDetailsModal({ movie, language, onClose }: MovieDetailsModalProps) {
	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border">
				{/* Header with Close Button */}
				<div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-4 border-b flex items-center justify-between">
					<h2 className="text-xl font-bold flex items-center gap-2">
						<Film className="size-5 text-primary" />
						Movie Details
					</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<X className="size-5" />
					</Button>
				</div>

				{/* Movie Content */}
				<div className="p-6 space-y-6">
					{/* Video Preview */}
					<div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
						<img
							src={`https://img.youtube.com/vi/${movie.videoId}/maxresdefault.jpg`}
							alt={movie.name}
							className="w-full h-full object-cover"
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = `https://img.youtube.com/vi/${movie.videoId}/hqdefault.jpg`;
							}}
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
							<Button
								size="lg"
								className="gap-2 text-lg px-8 py-6"
								onClick={() => {
									window.open(`https://www.youtube.com/watch?v=${movie.videoId}`, "_blank");
								}}
							>
								<Play className="size-6 fill-current" />
								Watch Now
							</Button>
						</div>
					</div>

					{/* Movie Info */}
					<div className="space-y-4">
						<div>
							<h1 className="text-3xl font-bold mb-2">{movie.name}</h1>
							<div className="flex flex-wrap gap-2">
								<Badge variant="secondary" className="capitalize">
									{language}
								</Badge>
								<Badge variant="outline">
									<Film className="size-3 mr-1" />
									Full Movie
								</Badge>
							</div>
						</div>

						<div className="space-y-3">
							<div className="flex items-start gap-3">
								<span className="text-sm font-semibold text-muted-foreground min-w-[100px]">
									Movie ID:
								</span>
								<span className="text-sm font-mono">{movie.id}</span>
							</div>
							<div className="flex items-start gap-3">
								<span className="text-sm font-semibold text-muted-foreground min-w-[100px]">
									Video ID:
								</span>
								<span className="text-sm font-mono">{movie.videoId}</span>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-wrap gap-3 pt-4 border-t">
							<Button
								className="flex-1 gap-2"
								onClick={() => {
									window.open(`https://www.youtube.com/watch?v=${movie.videoId}`, "_blank");
								}}
							>
								<Play className="size-4 fill-current" />
								Watch on YouTube
							</Button>
							<Button
								variant="outline"
								className="gap-2"
								onClick={() => {
									window.open(
										`https://www.youtube.com/watch?v=${movie.videoId}`,
										"_blank",
										"width=800,height=600",
									);
								}}
							>
								<ExternalLink className="size-4" />
								Open in New Window
							</Button>
						</div>
					</div>

					{/* Embedded Player (Optional) */}
					<div className="pt-4 border-t">
						<h3 className="text-lg font-semibold mb-3">Preview</h3>
						<div className="relative aspect-video rounded-xl overflow-hidden bg-black">
							<iframe
								src={`https://www.youtube.com/embed/${movie.videoId}`}
								title={movie.name}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
