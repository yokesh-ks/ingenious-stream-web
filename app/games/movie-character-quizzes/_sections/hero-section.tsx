import { Trophy, Sparkles } from "lucide-react";

export function HeroSection() {
	return (
		<div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 h-[240px]">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-30">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
						backgroundSize: "24px 24px",
					}}
				/>
			</div>
			<div className="relative z-10 h-full flex flex-col justify-between">
				<div>
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Movie Character <span className="text-yellow-400">Quizzes</span>
					</h2>

				</div>
				<div className="flex items-center gap-6 text-white/80 text-sm">
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-green-400" />
						<span>1000+ Questions Available</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-yellow-400" />
						<span>Multiple Difficulty Levels</span>
					</div>
					<div className="flex items-center gap-3">
						<div className="size-3 rounded-full bg-blue-400" />
						<span>Live Leaderboards</span>
					</div>
				</div>
			</div>
			<div className="absolute right-8 bottom-6 text-9xl opacity-20">🎬</div>
			<div className="absolute top-6 right-1/3 text-white text-3xl opacity-30">🍿</div>
			<div className="absolute bottom-8 right-1/4 text-white text-2xl opacity-30">⭐</div>
			<div className="absolute top-16 left-8 text-white text-2xl opacity-30">🏆</div>
		</div>
	);
}
