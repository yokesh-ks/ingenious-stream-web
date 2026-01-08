"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import type { Movie } from "../../actions";
import MovieDetailsModal from "./MovieDetailsModal";

interface MovieGridProps {
	movies: Movie[];
	language: string;
}

export default function MovieGrid({ movies, language }: MovieGridProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
	const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

	const filteredMovies = movies.filter((movie) =>
		movie.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			{/* Search Bar */}
			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input
					placeholder="Search movies..."
					className="pl-9 bg-muted/50 border-0"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Movies Grid - YouTube Style */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{filteredMovies.map((movie) => (
					<div key={movie.id} className="group cursor-pointer">
						{/* Thumbnail Container - YouTube 16:9 aspect ratio */}
						<div
							className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3"
							onClick={() => setPlayingMovie(movie)}
						>
							{/* YouTube Thumbnail */}
							<img
								src={`https://img.youtube.com/vi/${movie.videoId}/maxresdefault.jpg`}
								alt={movie.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									// Fallback to medium quality if maxres fails
									const target = e.target as HTMLImageElement;
									target.src = `https://img.youtube.com/vi/${movie.videoId}/hqdefault.jpg`;
								}}
							/>

							{/* Duration Badge (optional - can add if data available) */}
							<div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
								Movie
							</div>

							{/* Logo Overlay on Hover */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
								<div className="size-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg overflow-hidden">
									<Image
										src="/icon.png"
										alt="Play"
										width={48}
										height={48}
										className="object-cover"
									/>
								</div>
							</div>
						</div>

						{/* Video Info - YouTube Style */}
						<div className="flex gap-3">
							{/* Movie Icon (replaces channel avatar in YouTube) */}
							<div className="flex-shrink-0">
								<div className="size-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
									<span className="text-white text-xs font-bold">
										{movie.name.substring(0, 1).toUpperCase()}
									</span>
								</div>
							</div>

							{/* Movie Details */}
							<div className="flex-1 min-w-0">
								<h3
									className="font-semibold text-sm line-clamp-2 mb-1"
									onClick={() => setSelectedMovie(movie)}
								>
									{movie.name}
								</h3>

								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<span className="capitalize">{language}</span>
									<span>•</span>
									<span>Full Movie</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* No Results */}
			{filteredMovies.length === 0 && (
				<div className="text-center py-20">
					<p className="text-muted-foreground">No movies found matching "{searchQuery}"</p>
				</div>
			)}

			{/* Movie Details Modal */}
			{selectedMovie && (
				<MovieDetailsModal
					movie={selectedMovie}
					language={language}
					onClose={() => setSelectedMovie(null)}
				/>
			)}

			{/* Fullscreen Video Player Modal */}
			{playingMovie && (
				<div
					className="fixed inset-0 bg-black z-50 flex items-center justify-center"
					onClick={() => setPlayingMovie(null)}
				>
					<div
						className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Close Button */}
						<button
							onClick={() => setPlayingMovie(null)}
							className="absolute top-4 right-4 z-10 size-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
							aria-label="Close"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>

						{/* YouTube Player */}
						<div className="relative w-full h-full">
							<iframe
								src={`https://www.youtube.com/embed/${playingMovie.videoId}?autoplay=1&rel=0`}
								title={playingMovie.name}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
