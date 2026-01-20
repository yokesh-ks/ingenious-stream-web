"use client";

import { useState } from "react";
import { usePuzzleStore, type Difficulty } from "@/lib/stores/puzzle-store";
import { ImageSelector } from "./_components/image-selector";
import { GameBoard } from "./_components/game-board";
import { Toolbar } from "./_components/toolbar";
import { CompletionModal } from "./_components/completion-modal";
import { ArrowLeft, Puzzle, ChevronLeft, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const difficultyOptions: { value: Difficulty; label: string; grid: string }[] = [
	{ value: 9, label: "Easy", grid: "3×3" },
	{ value: 16, label: "Medium", grid: "4×4" },
	{ value: 25, label: "Hard", grid: "5×5" },
	{ value: 36, label: "Expert", grid: "6×6" },
	{ value: 49, label: "Master", grid: "7×7" },
	{ value: 81, label: "Legendary", grid: "9×9" },
];

export default function PuzzlePage() {
	const { gameStatus, imageUrl, difficulty, setDifficulty, startGame, resetGame } =
		usePuzzleStore();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [selectedImageTitle, setSelectedImageTitle] = useState<string>("");
	const [step, setStep] = useState<1 | 2>(1);

	const handleImageSelect = (url: string, title: string) => {
		setSelectedImage(url);
		setSelectedImageTitle(title);
		usePuzzleStore.getState().setImage(url);
		setStep(2); // Auto-advance to step 2
	};

	const handleBack = () => {
		setStep(1);
	};

	const handleStartGame = () => {
		if (selectedImage) {
			startGame();
		}
	};

	// Idle or selecting state - show image selector
	if (gameStatus === "idle" || gameStatus === "selecting") {
		return (
			<div className="w-full min-h-screen overflow-y-auto bg-background">
				{/* Header */}
				<div className="flex items-center gap-4 mb-6">
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
							<p className="text-sm text-muted-foreground">
								{step === 1 ? "Select an image to continue" : "Choose difficulty and start"}
							</p>
						</div>
					</div>
				</div>

				{/* Step Indicator */}
				<div className="flex items-center gap-2 mb-6">
					<div
						className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
							step === 1 ? "bg-purple-500 text-white" : "bg-secondary text-muted-foreground"
						}`}
					>
						<span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
							1
						</span>
						Select Image
					</div>
					<div className="w-8 h-0.5 bg-border" />
					<div
						className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
							step === 2 ? "bg-purple-500 text-white" : "bg-secondary text-muted-foreground"
						}`}
					>
						<span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
							2
						</span>
						Start Puzzle
					</div>
				</div>

				{/* Step 1: Image Selection */}
				{step === 1 && <ImageSelector onSelect={handleImageSelect} />}

				{/* Step 2: Selected Image + Difficulty + Start */}
				{step === 2 && selectedImage && (
					<div className="space-y-6">
						{/* Back Button */}
						<button
							onClick={handleBack}
							className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
						>
							<ChevronLeft className="w-4 h-4" />
							<span className="text-sm">Change image</span>
						</button>

						{/* Selected Image Preview */}
						<div className="flex flex-col sm:flex-row gap-6 items-start">
							<div className="relative w-full sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden border-4 border-purple-500 shadow-xl shadow-purple-500/20">
								<Image
									src={selectedImage}
									alt={selectedImageTitle}
									fill
									className="object-cover"
									unoptimized
								/>
							</div>
							<div className="flex-1 space-y-6">
								<div>
									<h2 className="text-xl font-bold text-foreground">{selectedImageTitle}</h2>
									<p className="text-muted-foreground">Selected for puzzle</p>
								</div>

								{/* Difficulty Selector */}
								<div className="space-y-3">
									<h3 className="text-lg font-semibold text-foreground">Choose Difficulty</h3>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
										{difficultyOptions.map((option) => (
											<button
												key={option.value}
												onClick={() => setDifficulty(option.value)}
												className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
													difficulty === option.value
														? "border-purple-500 bg-purple-500/10"
														: "border-border hover:border-purple-500/50 bg-card"
												}`}
											>
												<div className="text-center">
													<div className="text-lg font-bold text-foreground">{option.grid}</div>
													<div className="text-sm text-muted-foreground">{option.label}</div>
													<div className="text-xs text-muted-foreground mt-1">
														{option.value} pieces
													</div>
												</div>
												{difficulty === option.value && (
													<div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
														<svg
															className="w-2.5 h-2.5 text-white"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
												)}
											</button>
										))}
									</div>
								</div>

								{/* Start Button */}
								<button
									onClick={handleStartGame}
									className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white text-lg font-bold rounded-2xl hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
								>
									<Play className="w-5 h-5" />
									Start Puzzle
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}

	// Playing, paused, or completed state - show game board
	return (
		<div className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
			<div className="h-full flex flex-col">
				{/* Toolbar */}
				<Toolbar onExit={resetGame} />

				{/* Game Board */}
				<div className="flex-1 overflow-hidden">
					<GameBoard imageUrl={imageUrl!} />
				</div>

				{/* Completion Modal */}
				{gameStatus === "completed" && <CompletionModal />}
			</div>
		</div>
	);
}
