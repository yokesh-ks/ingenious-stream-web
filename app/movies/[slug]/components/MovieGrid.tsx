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
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				{filteredMovies.map((movie) => (
					<div key={movie.id} className="group cursor-pointer">
						{/* Poster Container - Movie poster aspect ratio */}
						<div
							className="relative aspect-[2/3] rounded-xl overflow-hidden bg-muted mb-3"
							onClick={() => setPlayingMovie(movie)}
						>
							{/* Movie Poster */}
							<img
								src={movie.posterPath}
								alt={movie.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									// Fallback to YouTube thumbnail if poster fails to load
									const target = e.target as HTMLImageElement;
									target.src = `https://img.youtube.com/vi/${movie.videoId}/hqdefault.jpg`;
								}}
							/>

							{/* Duration Badge (optional - can add if data available) */}
							<div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
								Movie
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
