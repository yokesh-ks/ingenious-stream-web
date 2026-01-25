"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, RotateCcw, Home, Check, X, Medal, Zap, ArrowRight } from "lucide-react";
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
      const baseScore = opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.65 : 0.8;
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
  const allScores = [{ name: playerName, score, isPlayer: true }, ...opponentScores.map((os) => ({ name: os.opponent.name, score: os.score, isPlayer: false }))];
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
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8">
      {/* Results Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">{getRankEmoji(playerRank)}</div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-200 bg-clip-text text-transparent">
          Quiz Complete!
        </h1>
        <p className="text-xl text-gray-400">{getRankMessage(playerRank)}</p>
      </div>

      {/* Score Card */}
      <div className="w-full max-w-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
        {/* Main Score */}
        <div className="text-center mb-8">
          <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent mb-2">
            {animatedScore.toLocaleString()}
          </div>
          <div className="text-gray-400 text-lg">Total Points</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-700/50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Check className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{correctAnswers}</div>
            <div className="text-sm text-gray-400">Correct</div>
          </div>
          <div className="bg-slate-700/50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <X className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">{totalQuestions - correctAnswers}</div>
            <div className="text-sm text-gray-400">Wrong</div>
          </div>
          <div className="bg-slate-700/50 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-sm text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Final Standings
          </h3>
          <div className="space-y-3">
            {allScores.map((entry, index) => (
              <div
                key={entry.name}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  entry.isPlayer
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/30"
                    : "bg-slate-700/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getRankEmoji(index + 1)}</span>
                  <span className={`font-medium ${entry.isPlayer ? "text-blue-300" : "text-gray-300"}`}>
                    {entry.name} {entry.isPlayer && "(You)"}
                  </span>
                </div>
                <span className="font-bold text-white">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-3 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <span>{showDetails ? "Hide" : "Show"} Answer Details</span>
          <ArrowRight className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`} />
        </button>

        {/* Answer Details */}
        {showDetails && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {answers.map((answer, index) => (
              <div
                key={answer.questionId}
                className={`flex items-center justify-between p-3 rounded-xl ${
                  answer.isCorrect ? "bg-green-900/20 border border-green-500/20" : "bg-red-900/20 border border-red-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400">Q{index + 1}</span>
                  <span className="text-white">{answer.selectedAnswer}</span>
                </div>
                <div className="flex items-center gap-2">
                  {answer.isCorrect ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <>
                      <span className="text-sm text-gray-400">→ {answer.correctAnswer}</span>
                      <X className="w-5 h-5 text-red-400" />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayAgain}
          className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <div className="relative flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </div>
        </button>

        <Link
          href="/games/movie-character-quizzes"
          className="px-8 py-4 rounded-2xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg transition-all duration-300 flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span>More Quizzes</span>
        </Link>
      </div>
    </div>
  );
}
