"use client";

import { useState } from "react";
import { X, Check, Star } from "lucide-react";

interface PlayerEditModalProps {
	isOpen: boolean;
	currentName: string;
	currentAvatar: string;
	onSave: (name: string, avatar: string) => void;
	onClose: () => void;
}

const AVATAR_OPTIONS = [
	"😀",
	"😎",
	"🤓",
	"🧑‍🎤",
	"🦸",
	"🧙",
	"🎭",
	"👤",
	"🐱",
	"🐶",
	"🦊",
	"🐻",
	"🐼",
	"🦁",
	"🐸",
	"🐵",
	"🎬",
	"🎮",
	"🎯",
	"🏆",
	"⭐",
	"🔥",
	"💎",
	"🚀",
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
		<div className="fixed inset-0 z-50 flex items-center justify-center px-4">
			{/* Backdrop with cinema ambiance */}
			<div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

			{/* Modal */}
			<div className="relative w-full max-w-md">
				{/* Spotlight glow */}
				<div className="absolute -inset-4 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

				<div className="relative bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 rounded-2xl p-8 border border-amber-500/20 shadow-2xl overflow-hidden">
					{/* Top golden trim */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

					{/* Decorative stars */}
					<Star className="absolute top-4 left-4 w-4 h-4 text-amber-500/30 fill-amber-500/10" />
					<Star className="absolute top-4 right-12 w-3 h-3 text-amber-500/20 fill-amber-500/10" />

					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-amber-400 transition-colors"
					>
						<X className="w-5 h-5" />
					</button>

					<h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 mb-6 text-center">
						Your Star Profile
					</h2>

					{/* Preview */}
					<div className="flex flex-col items-center mb-6">
						<div className="relative group mb-4">
							{/* Glow ring */}
							<div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full blur-md opacity-40" />
							<div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-amber-900 via-amber-950 to-zinc-900 flex items-center justify-center text-6xl shadow-xl ring-4 ring-amber-500/50">
								<div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
								<span className="relative z-10">{avatar}</span>
							</div>
						</div>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter your name"
							maxLength={15}
							className="w-full text-center text-xl font-semibold bg-zinc-800/50 border border-amber-500/30 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
						/>
					</div>

					{/* Avatar Grid */}
					<div className="mb-6">
						<h3 className="text-sm font-medium text-amber-400/70 mb-3 uppercase tracking-wider">
							Choose Your Avatar
						</h3>
						<div className="grid grid-cols-8 gap-2">
							{AVATAR_OPTIONS.map((emoji) => (
								<button
									key={emoji}
									onClick={() => setAvatar(emoji)}
									className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200 ${
										avatar === emoji
											? "bg-amber-500/30 ring-2 ring-amber-400 scale-110"
											: "bg-zinc-800 hover:bg-zinc-700 hover:scale-105"
									}`}
								>
									{emoji}
								</button>
							))}
						</div>
					</div>

					{/* Save Button */}
					<button onClick={handleSave} disabled={!name.trim()} className="group relative w-full">
						{/* Button glow */}
						<div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />

						<div className="relative py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-900 font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden">
							{/* Shine effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
							<Check className="w-5 h-5 relative" />
							<span className="relative">Save Profile</span>
						</div>
					</button>

					{/* Bottom golden trim */}
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
				</div>
			</div>
		</div>
	);
}
