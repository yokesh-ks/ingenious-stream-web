"use client";

import { useState, useEffect } from "react";
import { QuizStartScreen } from "./_components/quiz-start-screen";
import { PlayerEditModal } from "./_components/player-edit-modal";

interface QuizStartPageClientProps {
  quizData: any;
  computerOpponents: any[];
}

export default function QuizStartPageClient({ quizData, computerOpponents }: QuizStartPageClientProps) {
  const [playerName, setPlayerName] = useState("You");
  const [playerAvatar, setPlayerAvatar] = useState("😀");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load player data from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("quizPlayerName");
    const savedAvatar = localStorage.getItem("quizPlayerAvatar");
    if (savedName) setPlayerName(savedName);
    if (savedAvatar) setPlayerAvatar(savedAvatar);
  }, []);

  const handleSavePlayer = (name: string, avatar: string) => {
    setPlayerName(name);
    setPlayerAvatar(avatar);
    localStorage.setItem("quizPlayerName", name);
    localStorage.setItem("quizPlayerAvatar", avatar);
  };

  return (
    <>
      <QuizStartScreen
        title={quizData.title}
        description={quizData.description}
        playerName={playerName}
        playerAvatar={playerAvatar}
        opponents={computerOpponents}
        onStartGame={() => window.location.href = `/games/movie-character-quizzes/${quizData.id}/play`}
        onEditPlayer={() => setIsEditModalOpen(true)}
      />
      
      <PlayerEditModal
        isOpen={isEditModalOpen}
        currentName={playerName}
        currentAvatar={playerAvatar}
        onSave={handleSavePlayer}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}