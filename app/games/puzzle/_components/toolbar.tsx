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
		<div className="flex items-center justify-between pb-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-border">
			{/* Left Section - Stats */}
			<div className="flex items-center gap-4">
				{/* Timer */}
				<div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl">
					<Clock className="w-4 h-4 text-muted-foreground" />
					<span className="font-mono font-bold text-foreground">{formatTime(elapsedTime)}</span>
				</div>

				{/* Piece Count */}
				<div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl">
					<Puzzle className="w-4 h-4 text-muted-foreground" />
					<span className="font-mono font-bold text-foreground">{difficulty} pieces</span>
				</div>
			</div>

			{/* Center Section - Controls */}
			<div className="flex items-center gap-2">
				{/* Pause/Resume */}
				{!isCompleted && (
					<button
						onClick={isPaused ? resumeGame : pauseGame}
						className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
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
					className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
						showPreview ? "bg-purple-500 text-white" : "bg-secondary hover:bg-secondary/80"
					}`}
					title={showPreview ? "Hide Preview" : "Show Preview"}
				>
					{showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
					<span className="text-sm font-medium hidden sm:inline">Preview</span>
				</button>

				{/* Restart */}
				<button
					onClick={restartGame}
					className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
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
					className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl transition-colors"
					title="Exit Game"
				>
					<X className="w-4 h-4" />
					<span className="text-sm font-medium hidden sm:inline">Exit</span>
				</button>
			</div>
		</div>
	);
}
