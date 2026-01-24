"use client";

import { usePuzzleStore } from "@/lib/stores/puzzle-store";
import { Pause, Play, Eye, EyeOff, RotateCcw, X, Clock, Puzzle } from "lucide-react";

interface ToolbarProps {
	onExit: () => void;
}

export function Toolbar({ onExit }: ToolbarProps) {
	const {
		gameStatus,
		elapsedTime,
		difficulty,
		showPreview,
		pauseGame,
		resumeGame,
		restartGame,
		togglePreview,
	} = usePuzzleStore();

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const isPaused = gameStatus === "paused";
	const isCompleted = gameStatus === "completed";

	return (
		<div className="flex items-center justify-between p-4 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 shadow-lg">
			{/* Left Section - Stats */}
			<div className="flex items-center gap-4">
				{/* Timer */}
				<div className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
					<Clock className="w-4 h-4 text-white/70" />
					<span className="font-mono font-bold text-white">{formatTime(elapsedTime)}</span>
				</div>

				{/* Piece Count */}
				<div className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
					<Puzzle className="w-4 h-4 text-white/70" />
					<span className="font-mono font-bold text-white">{difficulty} pieces</span>
				</div>
			</div>

			{/* Center Section - Controls */}
			<div className="flex items-center gap-2">
				{/* Pause/Resume */}
				{!isCompleted && (
					<button
						onClick={isPaused ? resumeGame : pauseGame}
						className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 text-white transition-colors"
						title={isPaused ? "Resume" : "Pause"}
					>
						{isPaused ? (
							<>
								<Play className="w-4 h-4" />
								<span className="text-sm font-medium hidden sm:inline">Resume</span>
							</>
						) : (
							<>
								<Pause className="w-4 h-4" />
								<span className="text-sm font-medium hidden sm:inline">Pause</span>
							</>
						)}
					</button>
				)}

				{/* Preview Toggle */}
				<button
					onClick={togglePreview}
					className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20 transition-colors ${
						showPreview
							? "bg-purple-500/80 text-white"
							: "bg-white/20 dark:bg-white/10 hover:bg-white/30 text-white"
					}`}
					title={showPreview ? "Hide Preview" : "Show Preview"}
				>
					{showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
					<span className="text-sm font-medium hidden sm:inline">Preview</span>
				</button>

				{/* Restart */}
				<button
					onClick={restartGame}
					className="flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 hover:bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 text-white transition-colors"
					title="Restart"
				>
					<RotateCcw className="w-4 h-4" />
					<span className="text-sm font-medium hidden sm:inline">Restart</span>
				</button>
			</div>

			{/* Right Section - Exit */}
			<div className="flex items-center">
				<button
					onClick={onExit}
					className="flex items-center gap-2 px-4 py-2 bg-red-500/30 hover:bg-red-500/50 backdrop-blur-sm rounded-xl border border-red-500/30 text-white transition-colors"
					title="Exit Game"
				>
					<X className="w-4 h-4" />
					<span className="text-sm font-medium hidden sm:inline">Exit</span>
				</button>
			</div>
		</div>
	);
}
