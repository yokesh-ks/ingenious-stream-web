"use client";

import { usePuzzleStore } from "@/lib/stores/puzzle-store";
import { Trophy, Clock, Puzzle, RotateCcw, Home, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export function CompletionModal() {
	const { elapsedTime, difficulty, restartGame, resetGame } = usePuzzleStore();

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// Calculate star rating based on time
	const getStarRating = () => {
		const expectedTime = difficulty * 15; // 15 seconds per piece as baseline
		if (elapsedTime <= expectedTime * 0.5) return 3;
		if (elapsedTime <= expectedTime) return 2;
		return 1;
	};

	const stars = getStarRating();

	// Trigger confetti on mount
	useEffect(() => {
		const duration = 3000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

		function randomInRange(min: number, max: number) {
			return Math.random() * (max - min) + min;
		}

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
			<div className="relative mx-4 w-full max-w-md animate-in zoom-in-95 fade-in duration-300">
				{/* Glow Effect */}
				<div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-xl opacity-50" />

				<div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
					{/* Header */}
					<div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-8 text-center">
						{/* Background Pattern */}
						<div className="absolute inset-0 opacity-20">
							<div
								className="absolute inset-0"
								style={{
									backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
									backgroundSize: "20px 20px",
								}}
							/>
						</div>

						<div className="relative">
							<div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center">
								<Trophy className="w-10 h-10 text-white" />
							</div>
							<h2 className="text-3xl font-bold text-white mb-2">Puzzle Complete!</h2>

							{/* Stars */}
							<div className="flex items-center justify-center gap-1 mt-4">
								{[1, 2, 3].map((star) => (
									<Sparkles
										key={star}
										className={`w-8 h-8 transition-all duration-500 ${
											star <= stars
												? "text-yellow-300 fill-yellow-300 scale-100"
												: "text-white/30 scale-75"
										}`}
										style={{ animationDelay: `${star * 200}ms` }}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Stats */}
					<div className="p-6 space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="text-center p-4 bg-secondary rounded-xl">
								<Clock className="w-6 h-6 mx-auto text-purple-500 mb-2" />
								<div className="text-2xl font-bold text-foreground">{formatTime(elapsedTime)}</div>
								<div className="text-xs text-muted-foreground">Time</div>
							</div>
							<div className="text-center p-4 bg-secondary rounded-xl">
								<Puzzle className="w-6 h-6 mx-auto text-purple-500 mb-2" />
								<div className="text-2xl font-bold text-foreground">{difficulty}</div>
								<div className="text-xs text-muted-foreground">Pieces</div>
							</div>
						</div>

						{/* Actions */}
						<div className="flex flex-col gap-3 pt-2">
							<button
								onClick={restartGame}
								className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all"
							>
								<RotateCcw className="w-5 h-5" />
								Play Again
							</button>

							<div className="grid grid-cols-2 gap-3">
								<Link
									href="/games/jigsaw-puzzle"
									className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
								>
									<Puzzle className="w-4 h-4" />
									New Puzzle
								</Link>
								<Link
									href="/games"
									className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
								>
									<Home className="w-4 h-4" />
									Games
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
