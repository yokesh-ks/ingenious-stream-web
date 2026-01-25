"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getQuizData, computerOpponents, QuizData } from "../_constants/quiz-data";
import { QuizGame } from "../_components/quiz-game";
import { QuizResults } from "../_components/quiz-results";
import { PlayerEditModal } from "../_components/player-edit-modal";

type GameState = "playing" | "results";

interface AnswerRecord {
	questionId: string;
	selectedAnswer: string;
	correctAnswer: string;
	isCorrect: boolean;
	points: number;
	timeSpent: number;
}

export default function QuizPlayPage() {
	const params = useParams();
	const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

	const [gameState, setGameState] = useState<GameState>("playing");
	const [quizData, setQuizData] = useState<QuizData | null>(null);
	const [playerName, setPlayerName] = useState("You");
	const [playerAvatar, setPlayerAvatar] = useState("😀");
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [finalScore, setFinalScore] = useState(0);
	const [answers, setAnswers] = useState<AnswerRecord[]>([]);

	// Load quiz data
	useEffect(() => {
		if (slug) {
			const data = getQuizData(slug);
			setQuizData(data);
		}
	}, [slug]);

	// Load player data from localStorage
	useEffect(() => {
		const savedName = localStorage.getItem("quizPlayerName");
		const savedAvatar = localStorage.getItem("quizPlayerAvatar");
		if (savedName) setPlayerName(savedName);
		if (savedAvatar) setPlayerAvatar(savedAvatar);
	}, []);

	const handleGameEnd = (score: number, gameAnswers: AnswerRecord[]) => {
		setFinalScore(score);
		setAnswers(gameAnswers);
		setGameState("results");
	};

	const handlePlayAgain = () => {
		window.location.href = `/games/movie-character-quizzes/${slug}`;
	};

	const handleSavePlayer = (name: string, avatar: string) => {
		setPlayerName(name);
		setPlayerAvatar(avatar);
		localStorage.setItem("quizPlayerName", name);
		localStorage.setItem("quizPlayerAvatar", avatar);
	};

	if (!quizData) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="relative text-center">
					{/* Spotlight effect */}
					<div className="absolute -inset-20 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

					<div className="relative space-y-6">
						<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border border-amber-500/30 shadow-lg">
							<span className="text-5xl">🎬</span>
						</div>

						<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
							Scene Not Found
						</h1>
						<p className="text-zinc-400 max-w-sm mx-auto">
							This quiz seems to have left the theatre. Let&apos;s find you another showtime.
						</p>

						<Link
							href="/games/movie-character-quizzes"
							className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-900 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/20"
						>
							Browse All Quizzes
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<div>
				{/* Main Content */}
				<main className="max-w-6xl mx-auto px-6 py-8">
					{gameState === "playing" && (
						<QuizGame
							questions={quizData.questions}
							opponents={computerOpponents}
							playerName={playerName}
							playerAvatar={playerAvatar}
							onGameEnd={handleGameEnd}
						/>
					)}

					{gameState === "results" && (
						<QuizResults
							score={finalScore}
							totalQuestions={quizData.totalQuestions}
							answers={answers}
							opponents={computerOpponents}
							playerName={playerName}
							playerAvatar={playerAvatar}
							onPlayAgain={handlePlayAgain}
						/>
					)}
				</main>
			</div>

			{/* Player Edit Modal */}
			<PlayerEditModal
				isOpen={isEditModalOpen}
				currentName={playerName}
				currentAvatar={playerAvatar}
				onSave={handleSavePlayer}
				onClose={() => setIsEditModalOpen(false)}
			/>
		</div>
	);
}
