"use client";

import { Play, Clapperboard } from "lucide-react";
import { Opponent } from "../_constants/quiz-data";

interface QuizStartScreenProps {
  title: string;
  description: string;
  playerName: string;
  playerAvatar: string;
  opponents: Opponent[];
  onStartGame: () => void;
  onEditPlayer: () => void;
}

export function QuizStartScreen({
  title,
  description,
  playerName,
  playerAvatar,
  opponents,
  onStartGame,
  onEditPlayer,
}: QuizStartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-8">
      {/* Main Quiz Card - ActionQuiz Style */}
      <div className="relative w-full max-w-3xl">
        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-2xl blur-lg opacity-75" />
        
        {/* Main card */}
        <div className="relative bg-gradient-to-b from-[#0a1628] via-[#0d1d35] to-[#0a1628] rounded-xl border border-cyan-500/30 shadow-2xl overflow-hidden">
          {/* Cinema curtain effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-16 bg-gradient-to-t from-red-950/80 via-red-900/40 to-transparent rounded-t-full"
                  style={{ 
                    height: `${Math.random() * 20 + 40}px`,
                    opacity: 0.6 + Math.random() * 0.4 
                  }}
                />
              ))}
            </div>
          </div>

          {/* Header with logo and title */}
          <div className="pt-6 pb-4 px-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Clapperboard className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {title} quiz
                </h1>
              </div>
            </div>
            <p className="mt-3 text-gray-300 text-sm md:text-base pl-1">
              {description}
            </p>
          </div>

          {/* Players Section */}
          <div className="px-8 py-6">
            <div className="flex items-start justify-center gap-6 md:gap-12">
              {/* Player (You) Column */}
              <div className="flex flex-col items-center">
                <p className="text-gray-300 text-sm mb-3 font-medium">You:</p>
                <div className="relative">
                  {/* Avatar with 3D-style effect */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-[#4a7c59] via-[#3d6b4a] to-[#2d5a3b] flex items-center justify-center text-4xl md:text-5xl shadow-lg ring-4 ring-[#2a4a35] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
                    <span className="relative z-10">{playerAvatar}</span>
                  </div>
                </div>
                <span className="mt-2 font-semibold text-white text-base md:text-lg">{playerName}</span>
                <button
                  onClick={onEditPlayer}
                  className="mt-1 px-4 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/60 rounded hover:bg-cyan-500/10 transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* VS Text - Simple like ActionQuiz */}
              <div className="flex flex-col items-center justify-center pt-10">
                <span className="text-xl md:text-2xl font-bold text-gray-400">vs.</span>
              </div>

              {/* Computer Opponents Column */}
              <div className="flex flex-col items-center">
                <p className="text-gray-300 text-sm mb-3 font-medium">Your computer opponents:</p>
                
                {/* Opponents Row */}
                <div className="flex items-start gap-4 md:gap-6">
                  {opponents.map((opponent) => (
                    <div
                      key={opponent.id}
                      className="flex flex-col items-center"
                    >
                      <div className="relative">
                        {/* 3D-style avatar */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-[#4a7c59] via-[#3d6b4a] to-[#2d5a3b] flex items-center justify-center text-3xl md:text-4xl shadow-lg ring-3 ring-[#2a4a35] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
                          <span className="relative z-10">{opponent.avatarEmoji}</span>
                        </div>
                      </div>
                      <span className="mt-2 font-semibold text-white text-xs md:text-sm">{opponent.name}</span>
                      <span className="text-[10px] md:text-xs text-gray-500 italic">{opponent.country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Play Button - Green like ActionQuiz */}
          <div className="px-8 pb-8 pt-4">
            <button
              onClick={onStartGame}
              className="w-full max-w-md mx-auto block py-4 px-8 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 hover:from-green-400 hover:via-emerald-400 hover:to-green-400 text-white font-bold text-2xl md:text-3xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02]"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
