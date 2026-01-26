import { ArrowLeft, Puzzle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { puzzleImages } from "../_constants/movie-posters";
import { DifficultySelector } from "./_components/difficulty-selector";

export default async function PuzzleSlugPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	// Find the selected movie based on slug
	const selectedMovie = puzzleImages.find((movie) => movie.slug === slug);

	// If movie not found, show error
	if (!selectedMovie) {
		return (
			<>
				<div className="text-center space-y-4">
					<h2 className="text-2xl font-bold text-foreground">Movie Not Found</h2>
					<p className="text-muted-foreground">The requested movie puzzle is not available</p>
					<Link
						href="/games/jigsaw-puzzle"
						className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
					>
						<ArrowLeft className="w-4 h-4" />
						Back to Puzzles
					</Link>
				</div>
			</>
		);
	}

	return (
		<>
			{/* Header */}
			<div className="flex items-center gap-4 px-6 mt-6">
				<Link
					href="/games/jigsaw-puzzle"
					className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
				</Link>
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
						<Puzzle className="w-5 h-5 text-white" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-foreground">Jigsaw Puzzle</h1>
						<p className="text-sm text-muted-foreground">Configure and start your puzzle</p>
					</div>
				</div>
			</div>

			{/* Step Indicator */}
			<div className="flex items-center gap-2 mb-6 px-6">
				<div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-purple-500 text-white">
					<span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
						1
					</span>
					Selected Image
				</div>
				<div className="w-8 h-0.5 bg-border" />
				<div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-secondary text-muted-foreground">
					<span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
						2
					</span>
					Start Puzzle
				</div>
			</div>

			{/* Selected Image Preview */}
			<div className="space-y-6 px-6">
				{/* Selected Image Preview */}
				<div className="flex flex-col sm:flex-row gap-6 items-start">
					<div className="relative w-full sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden border-4 border-purple-500 shadow-xl shadow-purple-500/20">
						<Image
							src={selectedMovie.url}
							alt={selectedMovie.title}
							fill
							className="object-cover"
							unoptimized
						/>
					</div>
					<div className="flex-1 space-y-6">
						<div>
							<h2 className="text-xl font-bold text-foreground">{selectedMovie.title}</h2>
							<p className="text-muted-foreground">Movie poster puzzle</p>
						</div>

						{/* Difficulty Selector */}
						<DifficultySelector slug={slug} />
					</div>
				</div>
			</div>
		</>
	);
}
