"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, X, Trophy, Clock, Zap } from "lucide-react";
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
    opponents.map((o) => ({ id: o.id, score: 0, currentQuestion: 0 }))
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
        const baseDelay = opponent.difficulty === "easy" ? 4000 : opponent.difficulty === "medium" ? 2500 : 1500;
        const randomDelay = baseDelay + Math.random() * 3000;

        return setTimeout(() => {
          // Check if opponent hasn't answered yet
          setOpponentsAnswered((prev) => {
            if (prev.has(opponent.id)) return prev;
            
            // Simulate opponent answering
            const correctChance = opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.7 : 0.85;
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
                  : os
              )
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
        const correctChance = opponent.difficulty === "easy" ? 0.5 : opponent.difficulty === "medium" ? 0.7 : 0.85;
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
              : os
          )
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
    [isAnswered, currentQuestion, pointValue, currentQuestionIndex, totalQuestions, score, answers, onGameEnd, triggerRemainingOpponents]
  );

  const getAnswerButtonClasses = (option: string) => {
    const baseClasses =
      "relative w-full p-5 rounded-2xl font-semibold text-lg transition-all duration-300 border-2 overflow-hidden";

    if (!isAnswered) {
      return `${baseClasses} bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:border-blue-500 hover:from-slate-600 hover:to-slate-700 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer`;
    }

    if (option === currentQuestion.correctAnswer) {
      return `${baseClasses} bg-gradient-to-br from-green-600 to-green-700 border-green-400 text-white shadow-lg shadow-green-500/30`;
    }

    if (option === selectedAnswer && !isCorrect) {
      return `${baseClasses} bg-gradient-to-br from-red-600 to-red-700 border-red-400 text-white shadow-lg shadow-red-500/30`;
    }

    return `${baseClasses} bg-slate-800/50 border-slate-700 text-gray-400 opacity-60`;
  };

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between mb-8 bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400 uppercase tracking-wider">Question</div>
          <div className="text-3xl font-bold text-white">
            {currentQuestionIndex + 1}
            <span className="text-gray-500">/{totalQuestions}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          <div className="text-sm text-gray-400 uppercase tracking-wider">Points</div>
          <div
            className={`text-3xl font-bold transition-colors ${
              pointValue > 700 ? "text-green-400" : pointValue > 400 ? "text-yellow-400" : "text-red-400"
            }`}
          >
            {pointValue}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          <div className="text-sm text-gray-400 uppercase tracking-wider">Score</div>
          <div className="text-3xl font-bold text-white">{score.toLocaleString()}</div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-3xl p-8 mb-8 shadow-2xl border border-white/20">
        <div className="text-center">
          <p className="text-gray-500 mb-2 text-sm">
            We can find this character or characters in which movie?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            {currentQuestion.characterName}
          </h2>
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

      {/* Mid-game Leaderboard Overlay */}
      {showMidGameLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-cyan-500/50 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-center">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Trophy className="w-6 h-6" />
                Leaderboard Update
              </h3>
              <p className="text-blue-100 text-sm mt-1">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
            </div>
            
            <div className="p-6 space-y-4">
              {[
                { name: playerName, avatar: playerAvatar, score, isPlayer: true },
                ...opponents.map(o => ({
                  name: o.name,
                  avatar: o.avatarEmoji,
                  score: opponentScores.find(os => os.id === o.id)?.score || 0,
                  isPlayer: false
                }))
              ]
                .sort((a, b) => b.score - a.score)
                .map((entry, idx) => (
                  <div 
                    key={entry.name}
                    className={`flex items-center justify-between p-4 rounded-2xl border ${
                      entry.isPlayer 
                        ? "bg-blue-500/10 border-blue-500/50" 
                        : "bg-slate-800/50 border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-400 w-6">{idx + 1}.</span>
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                        {entry.avatar}
                      </div>
                      <span className={`font-semibold ${entry.isPlayer ? "text-white" : "text-gray-300"}`}>
                        {entry.name} {entry.isPlayer && "(You)"}
                      </span>
                    </div>
                    <span className={`text-xl font-bold ${entry.isPlayer ? "text-blue-400" : "text-gray-400"}`}>
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
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-xl rounded-2xl shadow-lg transition-all active:scale-[0.98]"
              >
                Continue Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
