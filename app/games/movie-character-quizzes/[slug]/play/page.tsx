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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-2xl font-bold text-white">Quiz Not Found</h1>
          <p className="text-gray-400">The quiz you're looking for doesn't exist.</p>
          <Link
            href="/games/movie-character-quizzes"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Quizzes
          </Link>
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