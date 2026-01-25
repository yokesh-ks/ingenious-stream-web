"use client";

import { Film, Sparkles, Star } from "lucide-react";
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
		<div className="flex flex-col items-center justify-center min-h-[80vh] py-8 px-4">
			{/* Film strip decoration - top */}
			<div className="w-full max-w-4xl mb-6 flex items-center justify-center gap-2 opacity-60">
				<div className="flex-1 h-8 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-800 rounded-l-sm flex items-center justify-end px-2 gap-1">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="w-4 h-5 bg-zinc-950 rounded-sm" />
					))}
				</div>
				<Film className="w-8 h-8 text-amber-500" />
				<div className="flex-1 h-8 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-800 rounded-r-sm flex items-center px-2 gap-1">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="w-4 h-5 bg-zinc-950 rounded-sm" />
					))}
				</div>
			</div>

			{/* Main Quiz Card */}
			<div className="relative w-full max-w-4xl">
				{/* Spotlight glow effect */}
				<div className="absolute -inset-4 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />
				<div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 via-red-800/20 to-amber-600/30 rounded-2xl blur-lg opacity-60" />

				{/* Main card */}
				<div className="relative bg-gradient-to-b from-zinc-900/95 via-zinc-900 to-zinc-950 rounded-2xl border border-amber-500/20 shadow-2xl overflow-hidden backdrop-blur-sm">
					{/* Top golden trim */}
					<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

					{/* Decorative corner stars */}
					<Star className="absolute top-4 left-4 w-5 h-5 text-amber-500/40 fill-amber-500/20" />
					<Star className="absolute top-4 right-4 w-5 h-5 text-amber-500/40 fill-amber-500/20" />

					{/* Header Section - Movie Poster Style */}
					<div className="relative pt-8 pb-6 px-6 md:px-10 text-center">
						{/* Sparkle decorations */}
						<Sparkles className="absolute top-6 left-1/4 w-4 h-4 text-amber-400/50 animate-pulse" />
						<Sparkles
							className="absolute top-10 right-1/4 w-3 h-3 text-amber-400/40 animate-pulse"
							style={{ animationDelay: "0.5s" }}
						/>

						{/* "Now Showing" badge */}
						<div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-900/80 via-red-800/80 to-red-900/80 rounded-full border border-red-700/50 mb-4">
							<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
							<span className="text-xs font-semibold text-red-100 uppercase tracking-widest">
								Now Showing
							</span>
						</div>

						<h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 tracking-tight drop-shadow-lg">
							{title}
						</h1>
						<p className="mt-4 text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
							{description}
						</p>
					</div>

					{/* Divider with film reel style */}
					<div className="flex items-center justify-center gap-3 px-6">
						<div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-amber-500/30" />
						<div className="flex gap-1">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="w-2 h-2 rounded-full bg-amber-500/40" />
							))}
						</div>
						<div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-500/30 to-amber-500/30" />
					</div>

					{/* Players Section */}
					<div className="px-6 md:px-10 py-8">
						<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
							{/* Player (You) */}
							<div className="flex flex-col items-center">
								<span className="text-amber-400/80 text-xs font-semibold uppercase tracking-wider mb-3">
									Challenger
								</span>
								<div className="relative group">
									{/* Glow ring */}
									<div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
									{/* Avatar */}
									<div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b from-amber-900 via-amber-950 to-zinc-900 flex items-center justify-center text-5xl md:text-6xl shadow-xl ring-4 ring-amber-500/50">
										<div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-full" />
										<span className="relative z-10">{playerAvatar}</span>
									</div>
								</div>
								<span className="mt-3 font-bold text-white text-lg md:text-xl">{playerName}</span>
								<button
									onClick={onEditPlayer}
									className="mt-2 px-5 py-1.5 text-xs font-semibold text-amber-300 border border-amber-500/50 rounded-full hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-300"
								>
									Edit Profile
								</button>
							</div>

							{/* VS Badge */}
							<div className="relative">
								<div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
								<div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-red-800 via-red-900 to-red-950 flex items-center justify-center border-2 border-red-600/50 shadow-lg">
									<span className="text-xl md:text-2xl font-black text-red-100">VS</span>
								</div>
							</div>

							{/* Computer Opponents */}
							<div className="flex flex-col items-center">
								<span className="text-amber-400/80 text-xs font-semibold uppercase tracking-wider mb-3">
									Opponents
								</span>

								<div className="flex items-start gap-4 md:gap-5">
									{opponents.map((opponent, index) => (
										<div
											key={opponent.id}
											className="flex flex-col items-center group"
											style={{ animationDelay: `${index * 0.1}s` }}
										>
											<div className="relative">
												{/* Subtle glow */}
												<div className="absolute -inset-1 bg-gradient-to-r from-zinc-500 to-zinc-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity" />
												{/* Avatar */}
												<div className="relative w-18 h-18 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 flex items-center justify-center text-3xl md:text-4xl shadow-lg ring-2 ring-zinc-600/50">
													<div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full" />
													<span className="relative z-10">{opponent.avatarEmoji}</span>
												</div>
											</div>
											<span className="mt-2 font-semibold text-white text-sm">{opponent.name}</span>
											<span className="text-[10px] text-zinc-500">{opponent.country}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Play Button Section */}
					<div className="px-6 md:px-10 pb-10 pt-4">
						<button onClick={onStartGame} className="group relative w-full max-w-sm mx-auto block">
							{/* Button glow */}
							<div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500" />

							{/* Button */}
							<div className="relative py-5 px-10 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 group-hover:from-amber-400 group-hover:via-amber-300 group-hover:to-amber-400 shadow-lg transition-all duration-300 group-hover:scale-[1.02] overflow-hidden">
								{/* Shine effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

								<span className="relative flex items-center justify-center gap-3 text-zinc-900 font-black text-2xl md:text-3xl tracking-wide">
									<Film className="w-7 h-7" />
									START QUIZ
								</span>
							</div>
						</button>

						{/* Hint text */}
						<p className="text-center text-zinc-500 text-xs mt-4">
							Answer faster than your opponents to win!
						</p>
					</div>

					{/* Bottom golden trim */}
					<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
				</div>
			</div>

			{/* Film strip decoration - bottom */}
			<div className="w-full max-w-4xl mt-6 flex items-center justify-center gap-2 opacity-40">
				<div className="flex-1 h-6 bg-gradient-to-r from-transparent to-zinc-800 rounded-l-sm flex items-center justify-end px-2 gap-1">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="w-3 h-4 bg-zinc-950 rounded-sm" />
					))}
				</div>
				<div className="w-4 h-4 rounded-full border-2 border-zinc-600" />
				<div className="flex-1 h-6 bg-gradient-to-l from-transparent to-zinc-800 rounded-r-sm flex items-center px-2 gap-1">
					{[...Array(6)].map((_, i) => (
						<div key={i} className="w-3 h-4 bg-zinc-950 rounded-sm" />
					))}
				</div>
			</div>
		</div>
	);
}
