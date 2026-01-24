import { ArrowLeft, Puzzle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { puzzleImages } from "./_constants/movie-posters";

export default function PuzzlePage() {
	return (
		<>
			{/* Header */}
			<div className="flex items-center gap-4 px-6 pt-6">
				<Link
					href="/games"
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
						<p className="text-sm text-muted-foreground">Select a movie poster to start</p>
					</div>
				</div>
			</div>

			{/* Movie Posters Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
				{puzzleImages.map((movie) => (
					<Link
						key={movie.id}
						href={`/games/jigsaw-puzzle/${movie.slug}`}
						className="group relative overflow-hidden rounded-xl bg-card hover:shadow-xl transition-all duration-300 hover:scale-105"
					>
						{/* Movie Poster Image */}
						<div className="relative aspect-[2/3] w-full overflow-hidden">
							<Image
								src={movie.url}
								alt={movie.title}
								fill
								className="object-cover group-hover:scale-110 transition-transform duration-300"
								unoptimized
							/>
							{/* Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						</div>

						{/* Movie Info */}
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
							<h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
							<div className="flex items-center gap-2 text-white/80 text-sm">
								<Puzzle className="w-4 h-4" />
								<span>Movie Poster Puzzle</span>
							</div>
						</div>

						{/* Hover Effect */}
						<div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</Link>
				))}
			</div>

			{/* No Selection Message */}
			<div className="mt-8 text-center">
				<p className="text-muted-foreground">
					Choose a movie poster to start your puzzle adventure
				</p>
			</div>
		</>
	);
}
