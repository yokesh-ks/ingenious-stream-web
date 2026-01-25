"use client";

import { useState, useEffect } from "react";
import {
	Trophy,
	Star,
	RotateCcw,
	Home,
	Check,
	X,
	Zap,
	ArrowRight,
	Film,
	Clapperboard,
} from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Opponent } from "../_constants/quiz-data";

interface AnswerRecord {
	questionId: string;
	selectedAnswer: string;
	correctAnswer: string;
	isCorrect: boolean;
	points: number;
	timeSpent: number;
}

interface OpponentFinalScore {
	opponent: Opponent;
	score: number;
}

interface QuizResultsProps {
	score: number;
	totalQuestions: number;
	answers: AnswerRecord[];
	opponents: Opponent[];
	playerName: string;
	playerAvatar: string;
	onPlayAgain: () => void;
}

export function QuizResults({
	score,
	totalQuestions,
	answers,
	opponents,
	playerName,
	playerAvatar,
	onPlayAgain,
}: QuizResultsProps) {
	const [showDetails, setShowDetails] = useState(false);
	const [animatedScore, setAnimatedScore] = useState(0);
	const [opponentScores, setOpponentScores] = useState<OpponentFinalScore[]>([]);

	const correctAnswers = answers.filter((a) => a.isCorrect).length;
	const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

	// Generate opponent final scores
	useEffect(() => {
		const generatedScores = opponents.map((opponent) => {
			const baseScore =
				opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.65 : 0.8;
			const variance = (Math.random() - 0.5) * 0.3;
			const effectiveRate = Math.min(0.95, Math.max(0.3, baseScore + variance));
			const opponentScore = Math.floor(totalQuestions * 700 * effectiveRate);
			return { opponent, score: opponentScore };
		});
		setOpponentScores(generatedScores.sort((a, b) => b.score - a.score));
	}, [opponents, totalQuestions]);

	// Animate score counter
	useEffect(() => {
		const duration = 2000;
		const steps = 60;
		const increment = score / steps;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= score) {
				setAnimatedScore(score);
				clearInterval(timer);
			} else {
				setAnimatedScore(Math.floor(current));
			}
		}, duration / steps);

		return () => clearInterval(timer);
	}, [score]);

	// Celebration confetti
	useEffect(() => {
		if (accuracy >= 70) {
			const duration = 3000;
			const end = Date.now() + duration;

			const frame = () => {
				confetti({
					particleCount: 3,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: ["#fbbf24", "#f59e0b", "#d97706"],
				});
				confetti({
					particleCount: 3,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: ["#3b82f6", "#6366f1", "#8b5cf6"],
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			};

			frame();
		}
	}, [accuracy]);

	// Determine player ranking
	const allScores = [
		{ name: playerName, score, isPlayer: true },
		...opponentScores.map((os) => ({ name: os.opponent.name, score: os.score, isPlayer: false })),
	];
	allScores.sort((a, b) => b.score - a.score);
	const playerRank = allScores.findIndex((s) => s.isPlayer) + 1;

	const getRankEmoji = (rank: number) => {
		switch (rank) {
			case 1:
				return "🥇";
			case 2:
				return "🥈";
			case 3:
				return "🥉";
			default:
				return "🎖️";
		}
	};

	const getRankMessage = (rank: number) => {
		switch (rank) {
			case 1:
				return "Champion! You dominated the competition!";
			case 2:
				return "Amazing! So close to the top!";
			case 3:
				return "Great job! You made it to the podium!";
			default:
				return "Good effort! Keep practicing!";
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 px-4">
			{/* Film strip decoration - top */}
			<div className="w-full max-w-2xl flex items-center justify-center gap-2 opacity-50">
				<div className="flex-1 h-6 bg-gradient-to-r from-transparent to-zinc-800 rounded-l-sm flex items-center justify-end px-2 gap-1">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="w-3 h-4 bg-zinc-950 rounded-sm" />
					))}
				</div>
				<Clapperboard className="w-6 h-6 text-amber-500" />
				<div className="flex-1 h-6 bg-gradient-to-l from-transparent to-zinc-800 rounded-r-sm flex items-center px-2 gap-1">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="w-3 h-4 bg-zinc-950 rounded-sm" />
					))}
				</div>
			</div>

			{/* Results Header */}
			<div className="text-center space-y-4">
				<div className="relative inline-block">
					<div className="absolute -inset-4 bg-amber-500/20 rounded-full blur-xl" />
					<div className="relative text-7xl">{getRankEmoji(playerRank)}</div>
				</div>
				<h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600">
					That&apos;s a Wrap!
				</h1>
				<p className="text-xl text-zinc-400">{getRankMessage(playerRank)}</p>
			</div>

			{/* Score Card - Cinema Theme */}
			<div className="relative w-full max-w-2xl">
				{/* Spotlight glow */}
				<div className="absolute -inset-4 bg-gradient-to-b from-amber-500/15 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

				<div className="relative bg-gradient-to-b from-zinc-900/95 via-zinc-900 to-zinc-950 rounded-2xl p-8 backdrop-blur-sm border border-amber-500/20 shadow-2xl overflow-hidden">
					{/* Golden trim */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

					{/* Decorative stars */}
					<Star className="absolute top-4 left-4 w-4 h-4 text-amber-500/30 fill-amber-500/10" />
					<Star className="absolute top-4 right-4 w-4 h-4 text-amber-500/30 fill-amber-500/10" />

					{/* Main Score */}
					<div className="text-center mb-8">
						<div className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 mb-2">
							{animatedScore.toLocaleString()}
						</div>
						<div className="text-amber-400/70 text-lg uppercase tracking-wider">
							Box Office Score
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-3 gap-4 mb-8">
						<div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-green-500/20">
							<div className="flex items-center justify-center mb-2">
								<Check className="w-6 h-6 text-green-400" />
							</div>
							<div className="text-2xl font-bold text-white">{correctAnswers}</div>
							<div className="text-sm text-zinc-400">Correct</div>
						</div>
						<div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-red-500/20">
							<div className="flex items-center justify-center mb-2">
								<X className="w-6 h-6 text-red-400" />
							</div>
							<div className="text-2xl font-bold text-white">{totalQuestions - correctAnswers}</div>
							<div className="text-sm text-zinc-400">Wrong</div>
						</div>
						<div className="bg-zinc-800/50 rounded-xl p-4 text-center border border-amber-500/20">
							<div className="flex items-center justify-center mb-2">
								<Zap className="w-6 h-6 text-amber-400" />
							</div>
							<div className="text-2xl font-bold text-white">{accuracy}%</div>
							<div className="text-sm text-zinc-400">Accuracy</div>
						</div>
					</div>

					{/* Leaderboard */}
					<div className="mb-6">
						<h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mb-4 flex items-center gap-2">
							<Trophy className="w-5 h-5 text-amber-500" />
							Final Credits
						</h3>
						<div className="space-y-3">
							{allScores.map((entry, index) => (
								<div
									key={entry.name}
									className={`flex items-center justify-between p-3 rounded-xl border ${
										entry.isPlayer
											? "bg-amber-500/10 border-amber-500/30"
											: "bg-zinc-800/30 border-zinc-700/50"
									}`}
								>
									<div className="flex items-center gap-3">
										<span className="text-2xl">{getRankEmoji(index + 1)}</span>
										<span
											className={`font-medium ${entry.isPlayer ? "text-amber-200" : "text-gray-300"}`}
										>
											{entry.name} {entry.isPlayer && "(You)"}
										</span>
									</div>
									<span className={`font-bold ${entry.isPlayer ? "text-amber-400" : "text-white"}`}>
										{entry.score.toLocaleString()}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Toggle Details */}
					<button
						onClick={() => setShowDetails(!showDetails)}
						className="w-full py-3 text-zinc-400 hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
					>
						<span>{showDetails ? "Hide" : "Show"} Scene Details</span>
						<ArrowRight
							className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`}
						/>
					</button>

					{/* Answer Details */}
					{showDetails && (
						<div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
							{answers.map((answer, index) => (
								<div
									key={answer.questionId}
									className={`flex items-center justify-between p-3 rounded-xl ${
										answer.isCorrect
											? "bg-green-900/20 border border-green-500/20"
											: "bg-red-900/20 border border-red-500/20"
									}`}
								>
									<div className="flex items-center gap-3">
										<span className="text-zinc-500">Scene {index + 1}</span>
										<span className="text-white text-sm">{answer.selectedAnswer}</span>
									</div>
									<div className="flex items-center gap-2">
										{answer.isCorrect ? (
											<Check className="w-5 h-5 text-green-400" />
										) : (
											<>
												<span className="text-xs text-zinc-400">→ {answer.correctAnswer}</span>
												<X className="w-5 h-5 text-red-400" />
											</>
										)}
									</div>
								</div>
							))}
						</div>
					)}

					{/* Bottom golden trim */}
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
				</div>
			</div>

			{/* Action Buttons */}
			<div className="flex flex-col sm:flex-row items-center gap-4">
				<button onClick={onPlayAgain} className="group relative overflow-hidden">
					<div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
					<div className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-900 font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
						<div className="relative flex items-center gap-2">
							<RotateCcw className="w-5 h-5" />
							<span>Watch Again</span>
						</div>
					</div>
				</button>

				<Link
					href="/games/movie-character-quizzes"
					className="px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-amber-500/30 hover:border-amber-500/50 text-white font-bold text-lg transition-all duration-300 flex items-center gap-2"
				>
					<Film className="w-5 h-5 text-amber-500" />
					<span>More Movies</span>
				</Link>
			</div>
		</div>
	);
}
