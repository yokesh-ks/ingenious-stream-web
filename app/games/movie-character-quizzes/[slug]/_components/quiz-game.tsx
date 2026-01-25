"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, X, Trophy, Zap, Film, Star } from "lucide-react";
import { QuizQuestion, Opponent } from "../_constants/quiz-data";
import confetti from "canvas-confetti";

interface QuizGameProps {
	questions: QuizQuestion[];
	opponents: Opponent[];
	playerName: string;
	playerAvatar: string;
	onGameEnd: (score: number, answers: AnswerRecord[]) => void;
}

interface AnswerRecord {
	questionId: string;
	selectedAnswer: string;
	correctAnswer: string;
	isCorrect: boolean;
	points: number;
	timeSpent: number;
}

interface OpponentScore {
	id: string;
	score: number;
	currentQuestion: number;
}

const MAX_POINTS_PER_QUESTION = 1000;
const MIN_POINTS_PER_QUESTION = 100;
const POINT_DECAY_RATE = 50; // Points lost per 100ms
const QUESTION_TIMEOUT = 20000; // 20 seconds per question

export function QuizGame({
	questions,
	opponents,
	playerName,
	playerAvatar,
	onGameEnd,
}: QuizGameProps) {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [pointValue, setPointValue] = useState(MAX_POINTS_PER_QUESTION);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isAnswered, setIsAnswered] = useState(false);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [answers, setAnswers] = useState<AnswerRecord[]>([]);
	const [opponentScores, setOpponentScores] = useState<OpponentScore[]>(
		opponents.map((o) => ({ id: o.id, score: 0, currentQuestion: 0 })),
	);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [showMidGameLeaderboard, setShowMidGameLeaderboard] = useState(false);
	const questionStartTime = useRef<number>(Date.now());
	const pointDecayInterval = useRef<NodeJS.Timeout | null>(null);

	const currentQuestion = questions[currentQuestionIndex];
	const totalQuestions = questions.length;

	// Point decay effect (Updated to be more static/less aggressive like reference)
	useEffect(() => {
		if (!isAnswered && !showMidGameLeaderboard) {
			questionStartTime.current = Date.now();
			// Set a random-ish high starting point value for each question like the reference site
			const baseValue = 750 + Math.floor(Math.random() * 200);
			setPointValue(baseValue);

			// In the reference site, the point value shown is often static or decays very slowly
			// We'll keep it static per question for better matching of the UI observed
			return () => {
				if (pointDecayInterval.current) {
					clearInterval(pointDecayInterval.current);
				}
			};
		}
	}, [currentQuestionIndex, isAnswered, showMidGameLeaderboard]);

	// Track which opponents have answered this question
	const [opponentsAnswered, setOpponentsAnswered] = useState<Set<string>>(new Set());

	// Reset opponents answered state when question changes
	useEffect(() => {
		setOpponentsAnswered(new Set());
	}, [currentQuestionIndex]);

	// Simulate opponent answers - they answer independently over time
	useEffect(() => {
		if (!isAnswered) {
			const opponentTimers = opponents.map((opponent) => {
				const baseDelay =
					opponent.difficulty === "easy" ? 4000 : opponent.difficulty === "medium" ? 2500 : 1500;
				const randomDelay = baseDelay + Math.random() * 3000;

				return setTimeout(() => {
					// Check if opponent hasn't answered yet
					setOpponentsAnswered((prev) => {
						if (prev.has(opponent.id)) return prev;

						// Simulate opponent answering
						const correctChance =
							opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.7 : 0.85;
						const isOpponentCorrect = Math.random() < correctChance;
						const opponentPoints = isOpponentCorrect
							? Math.floor(MAX_POINTS_PER_QUESTION - (randomDelay / 100) * POINT_DECAY_RATE * 0.5)
							: 0;

						setOpponentScores((prevScores) =>
							prevScores.map((os) =>
								os.id === opponent.id
									? {
											...os,
											score: os.score + Math.max(100, opponentPoints),
											currentQuestion: currentQuestionIndex + 1,
										}
									: os,
							),
						);

						return new Set([...prev, opponent.id]);
					});
				}, randomDelay);
			});

			return () => opponentTimers.forEach(clearTimeout);
		}
	}, [currentQuestionIndex, isAnswered, opponents]);

	// When player answers, trigger any opponents that haven't answered yet
	const triggerRemainingOpponents = useCallback(() => {
		opponents.forEach((opponent) => {
			setOpponentsAnswered((prev) => {
				if (prev.has(opponent.id)) return prev;

				// Opponent answers at this moment
				const correctChance =
					opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.7 : 0.85;
				const isOpponentCorrect = Math.random() < correctChance;
				const randomAnswerTime = 2000 + Math.random() * 3000; // Simulate their answer time
				const opponentPoints = isOpponentCorrect
					? Math.floor(MAX_POINTS_PER_QUESTION - (randomAnswerTime / 100) * POINT_DECAY_RATE * 0.5)
					: 0;

				setOpponentScores((prevScores) =>
					prevScores.map((os) =>
						os.id === opponent.id
							? {
									...os,
									score: os.score + Math.max(100, opponentPoints),
									currentQuestion: currentQuestionIndex + 1,
								}
							: os,
					),
				);

				return new Set([...prev, opponent.id]);
			});
		});
	}, [opponents, currentQuestionIndex]);

	const handleAnswer = useCallback(
		(answer: string) => {
			if (isAnswered) return;

			if (pointDecayInterval.current) {
				clearInterval(pointDecayInterval.current);
			}

			const timeSpent = Date.now() - questionStartTime.current;
			const correct = answer === currentQuestion.correctAnswer;
			const earnedPoints = correct ? pointValue : 0;

			setSelectedAnswer(answer);
			setIsAnswered(true);
			setIsCorrect(correct);

			// Trigger remaining opponents to answer
			triggerRemainingOpponents();

			if (correct) {
				setScore((prev) => prev + earnedPoints);
				// Trigger confetti for correct answer
				confetti({
					particleCount: 50,
					spread: 60,
					origin: { y: 0.7 },
					colors: ["#22c55e", "#10b981", "#34d399"],
				});
			}

			const answerRecord: AnswerRecord = {
				questionId: currentQuestion.id,
				selectedAnswer: answer,
				correctAnswer: currentQuestion.correctAnswer,
				isCorrect: correct,
				points: earnedPoints,
				timeSpent,
			};

			setAnswers((prev) => [...prev, answerRecord]);

			// Move to next question after delay
			setTimeout(() => {
				if (currentQuestionIndex < totalQuestions - 1) {
					// Check if we should show mid-game leaderboard (every 5 questions)
					const nextQuestionNumber = currentQuestionIndex + 2; // +2 because index is 0-based
					if ((currentQuestionIndex + 1) % 5 === 0 && currentQuestionIndex + 1 !== totalQuestions) {
						setShowMidGameLeaderboard(true);
					} else {
						setIsTransitioning(true);
						setTimeout(() => {
							setCurrentQuestionIndex((prev) => prev + 1);
							setSelectedAnswer(null);
							setIsAnswered(false);
							setIsCorrect(null);
							setIsTransitioning(false);
						}, 300);
					}
				} else {
					// Game ended
					onGameEnd(score + earnedPoints, [...answers, answerRecord]);
				}
			}, 1500);
		},
		[
			isAnswered,
			currentQuestion,
			pointValue,
			currentQuestionIndex,
			totalQuestions,
			score,
			answers,
			onGameEnd,
			triggerRemainingOpponents,
		],
	);

	const getAnswerButtonClasses = (option: string) => {
		const baseClasses =
			"relative w-full p-5 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 overflow-hidden";

		if (!isAnswered) {
			return `${baseClasses} bg-gradient-to-br from-zinc-800 to-zinc-900 border-amber-500/30 hover:border-amber-400 hover:from-zinc-700 hover:to-zinc-800 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer`;
		}

		if (option === currentQuestion.correctAnswer) {
			return `${baseClasses} bg-gradient-to-br from-green-600 to-green-700 border-green-400 text-white shadow-lg shadow-green-500/30`;
		}

		if (option === selectedAnswer && !isCorrect) {
			return `${baseClasses} bg-gradient-to-br from-red-600 to-red-700 border-red-400 text-white shadow-lg shadow-red-500/30`;
		}

		return `${baseClasses} bg-zinc-900/50 border-zinc-700 text-gray-400 opacity-60`;
	};

	return (
		<div
			className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
		>
			{/* Hide game content during Intermission */}
			{!showMidGameLeaderboard && (
				<>
					{/* Top Stats Bar - Cinema Style */}
					<div className="relative flex items-center justify-between mb-8 bg-zinc-900/80 backdrop-blur-md rounded-2xl p-4 border border-amber-500/20 overflow-hidden">
						{/* Golden trim */}
						<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

						<div className="flex items-center gap-2">
							<Film className="w-5 h-5 text-amber-500" />
							<div className="text-xs text-amber-400/70 uppercase tracking-wider">Scene</div>
							<div className="text-3xl font-bold text-white">
								{currentQuestionIndex + 1}
								<span className="text-zinc-500">/{totalQuestions}</span>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<Zap className="w-6 h-6 text-amber-400" />
							<div className="text-xs text-amber-400/70 uppercase tracking-wider">Points</div>
							<div
								className={`text-3xl font-bold transition-colors ${
									pointValue > 700
										? "text-green-400"
										: pointValue > 400
											? "text-amber-400"
											: "text-red-400"
								}`}
							>
								{pointValue}
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Trophy className="w-6 h-6 text-amber-500" />
							<div className="text-xs text-amber-400/70 uppercase tracking-wider">Score</div>
							<div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
								{score.toLocaleString()}
							</div>
						</div>
					</div>

					{/* Question Card - Cinema Screen Style */}
					<div className="relative mb-8">
						{/* Screen glow */}
						<div className="absolute -inset-2 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent rounded-3xl blur-xl pointer-events-none" />

						<div className="relative bg-gradient-to-b from-zinc-100 via-white to-zinc-100 rounded-2xl p-8 shadow-2xl border border-amber-500/20 overflow-hidden">
							{/* Film frame effect */}
							<div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 flex items-center justify-around px-4">
								{[...Array(12)].map((_, i) => (
									<div key={i} className="w-3 h-1 bg-zinc-900 rounded-sm" />
								))}
							</div>
							<div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 flex items-center justify-around px-4">
								{[...Array(12)].map((_, i) => (
									<div key={i} className="w-3 h-1 bg-zinc-900 rounded-sm" />
								))}
							</div>

							<div className="text-center py-2">
								<p className="text-zinc-500 mb-2 text-sm flex items-center justify-center gap-2">
									<Star className="w-4 h-4 text-amber-500" />
									Name the movie featuring this character
									<Star className="w-4 h-4 text-amber-500" />
								</p>
								<h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
									{currentQuestion.characterName}
								</h2>
							</div>
						</div>
					</div>

					{/* Answer Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
						{currentQuestion.options.map((option, index) => (
							<button
								key={index}
								onClick={() => handleAnswer(option)}
								disabled={isAnswered}
								className={getAnswerButtonClasses(option)}
							>
								<span className="relative z-10">{option}</span>
								{isAnswered && option === currentQuestion.correctAnswer && (
									<div className="absolute right-4 top-1/2 -translate-y-1/2">
										<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
											<Check className="w-6 h-6 text-white" />
										</div>
									</div>
								)}
								{isAnswered && option === selectedAnswer && !isCorrect && (
									<div className="absolute right-4 top-1/2 -translate-y-1/2">
										<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
											<X className="w-6 h-6 text-white" />
										</div>
									</div>
								)}
							</button>
						))}
					</div>
				</>
			)}

			{/* Mid-game Leaderboard - Cinema Theme */}
			{showMidGameLeaderboard && (
				<div className="flex items-center justify-center min-h-[60vh] p-4">
					<div className="relative w-full max-w-lg">
						{/* Spotlight glow */}
						<div className="absolute -inset-8 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

						<div className="relative bg-zinc-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl">
							{/* Golden trim */}
							<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

							<div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-6 text-center">
								<h3 className="text-2xl font-bold text-zinc-900 flex items-center justify-center gap-2">
									<Trophy className="w-6 h-6" />
									Intermission
								</h3>
								<p className="text-amber-900 text-sm mt-1">
									Scene {currentQuestionIndex + 1} of {totalQuestions}
								</p>
							</div>

							<div className="p-6 space-y-3">
								{[
									{ name: playerName, avatar: playerAvatar, score, isPlayer: true },
									...opponents.map((o) => ({
										name: o.name,
										avatar: o.avatarEmoji,
										score: opponentScores.find((os) => os.id === o.id)?.score || 0,
										isPlayer: false,
									})),
								]
									.sort((a, b) => b.score - a.score)
									.map((entry, idx) => (
										<div
											key={entry.name}
											className={`flex items-center justify-between p-4 rounded-xl border ${
												entry.isPlayer
													? "bg-amber-500/10 border-amber-500/50"
													: "bg-zinc-800/50 border-zinc-700"
											}`}
										>
											<div className="flex items-center gap-4">
												<span className="text-lg font-bold text-amber-400 w-6">{idx + 1}.</span>
												<div
													className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
														entry.isPlayer
															? "bg-amber-900/50 ring-2 ring-amber-500/50"
															: "bg-zinc-700"
													}`}
												>
													{entry.avatar}
												</div>
												<span
													className={`font-semibold ${entry.isPlayer ? "text-amber-100" : "text-gray-300"}`}
												>
													{entry.name} {entry.isPlayer && "(You)"}
												</span>
											</div>
											<span
												className={`text-xl font-bold ${entry.isPlayer ? "text-amber-400" : "text-gray-400"}`}
											>
												{entry.score.toLocaleString()}
											</span>
										</div>
									))}
							</div>

							<div className="p-6 pt-0">
								<button
									onClick={() => {
										setShowMidGameLeaderboard(false);
										setIsTransitioning(true);
										setTimeout(() => {
											setCurrentQuestionIndex((prev) => prev + 1);
											setSelectedAnswer(null);
											setIsAnswered(false);
											setIsCorrect(null);
											setIsTransitioning(false);
										}, 300);
									}}
									className="group relative w-full overflow-hidden"
								>
									<div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
									<div className="relative py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-900 font-bold text-xl rounded-xl shadow-lg transition-all">
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
										<span className="relative flex items-center justify-center gap-2">
											<Film className="w-5 h-5" />
											Continue Show
										</span>
									</div>
								</button>
							</div>

							{/* Bottom golden trim */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
