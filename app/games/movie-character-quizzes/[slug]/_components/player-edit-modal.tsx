"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

interface PlayerEditModalProps {
  isOpen: boolean;
  currentName: string;
  currentAvatar: string;
  onSave: (name: string, avatar: string) => void;
  onClose: () => void;
}

const AVATAR_OPTIONS = [
  "😀", "😎", "🤓", "🧑‍🎤", "🦸", "🧙", "🎭", "👤",
  "🐱", "🐶", "🦊", "🐻", "🐼", "🦁", "🐸", "🐵",
  "🎬", "🎮", "🎯", "🏆", "⭐", "🔥", "💎", "🚀",
];

export function PlayerEditModal({
  isOpen,
  currentName,
  currentAvatar,
  onSave,
  onClose,
}: PlayerEditModalProps) {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentAvatar);

  if (!isOpen) return null;

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), avatar);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 w-full max-w-md mx-4 border border-white/10 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Customize Your Profile
        </h2>

        {/* Preview */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl shadow-lg ring-4 ring-blue-500/30 mb-4">
            {avatar}
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            maxLength={15}
            className="w-full text-center text-xl font-semibold bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Avatar Grid */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Choose Avatar</h3>
          <div className="grid grid-cols-8 gap-2">
            {AVATAR_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setAvatar(emoji)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                  avatar === emoji
                    ? "bg-blue-600 ring-2 ring-blue-400 scale-110"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
