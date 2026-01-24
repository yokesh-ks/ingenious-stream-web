"use client";

import { usePuzzleStore, type Difficulty } from "@/lib/stores/puzzle-store";
import { GameBoard } from "./_components/game-board";
import { Toolbar } from "./_components/toolbar";
import { CompletionModal } from "./_components/completion-modal";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { puzzleImages } from "../../_constants/movie-posters";

export default function PuzzlePlayPage() {
	const { gameStatus, imageUrl, resetGame, setImage, startGame } = usePuzzleStore();
	const searchParams = useSearchParams();
	const router = useRouter();
	const params = useParams();

	// Get difficulty from URL query params and slug from URL path
	const difficultyParam = searchParams.get("difficulty");
	const slug = params.slug as string;

	// Find the selected movie based on slug
	const selectedMovie = useMemo(() => puzzleImages.find((movie) => movie.slug === slug), [slug]);

	// Reset game on mount or when slug/difficulty changes
	useEffect(() => {
		resetGame();
	}, [slug, difficultyParam, resetGame]);

	// Initialize game with image after reset
	useEffect(() => {
		if (slug && selectedMovie && gameStatus === "idle") {
			setImage(selectedMovie.url);
		}
	}, [slug, selectedMovie, gameStatus, setImage]);

	// Start game once image is set
	useEffect(() => {
		if (imageUrl && gameStatus === "selecting" && difficultyParam) {
			const difficultyValue = parseInt(difficultyParam, 10) as Difficulty;
			startGame(difficultyValue);
		}
	}, [imageUrl, gameStatus, difficultyParam, startGame]);

	// Handle exit button
	const handleExit = () => {
		resetGame();
		router.push(`/games/jigsaw-puzzle/${slug}`);
	};

	// Use the image from store or fallback to selectedMovie
	const puzzleImageUrl = imageUrl || selectedMovie?.url;

	// Playing, paused, or completed state - show game board
	return (
		<div className="h-full flex flex-col">
			{/* Toolbar */}
			<Toolbar onExit={handleExit} />

			{/* Game Board */}
			<div className="flex-1 overflow-hidden">
				{puzzleImageUrl ? (
					<GameBoard imageUrl={puzzleImageUrl} />
				) : (
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<p className="text-muted-foreground">Loading puzzle...</p>
						</div>
					</div>
				)}
			</div>

			{/* Completion Modal */}
			{gameStatus === "completed" && <CompletionModal />}
		</div>
	);
}
