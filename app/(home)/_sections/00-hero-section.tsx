import { Sparkles, Play, Tv, Radio, Film } from "lucide-react";

export default function HeroSection() {
	return (
		<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 via-pink-50 to-orange-50 dark:from-rose-900/30 dark:via-pink-900/20 dark:to-orange-900/20 p-8 md:p-10">
			{/* Decorative elements */}
			<div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-yellow-300/30 blur-xl" />
			<div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full bg-pink-300/20 blur-2xl" />

			<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Left content */}
				<div className="flex-1">
					<p className="text-lg md:text-xl text-rose-400 dark:text-rose-300 font-medium mb-1">
						Welcome to
					</p>
					<h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Ingenious{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
							Streams
						</span>
					</h1>
					<p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-6 max-w-md">
						Your gateway to endless entertainment. Stream Live TV, Radio, and Movies from around the
						world.
					</p>

					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-200/60 dark:bg-rose-800/40 text-rose-700 dark:text-rose-200 text-sm font-medium">
						<Sparkles className="w-4 h-4" />
						Stream Anywhere, Anytime
					</div>
				</div>

				{/* Right illustration - Person watching entertainment */}
				<div className="relative w-64 h-48 md:w-80 md:h-56 flex-shrink-0">
					{/* Couch/Chair */}
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-16 rounded-t-3xl bg-gradient-to-b from-amber-200 to-amber-300 dark:from-amber-700 dark:to-amber-800" />
					<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-amber-300 dark:bg-amber-800" />

					{/* Person body */}
					<div className="absolute bottom-12 left-1/2 -translate-x-1/2">
						{/* Torso */}
						<div className="relative">
							<div className="w-20 h-24 rounded-t-3xl bg-gradient-to-b from-indigo-400 to-indigo-500 dark:from-indigo-500 dark:to-indigo-600" />
							{/* Arms */}
							<div className="absolute top-8 -left-6 w-6 h-16 rounded-full bg-rose-200 dark:bg-rose-300 rotate-12" />
							<div className="absolute top-8 -right-6 w-6 h-16 rounded-full bg-rose-200 dark:bg-rose-300 -rotate-12" />
						</div>
					</div>

					{/* Head */}
					<div className="absolute bottom-32 left-1/2 -translate-x-1/2">
						<div className="w-14 h-16 rounded-full bg-rose-200 dark:bg-rose-300 relative">
							{/* Hair */}
							<div className="absolute -top-2 left-0 w-14 h-10 rounded-t-full bg-gradient-to-b from-pink-500 to-pink-600" />
							{/* Glasses */}
							<div className="absolute top-6 left-1 flex gap-1">
								<div className="w-5 h-4 rounded-full border-2 border-gray-800 bg-white/30" />
								<div className="w-5 h-4 rounded-full border-2 border-gray-800 bg-white/30" />
							</div>
							{/* Smile */}
							<div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-700 rounded-b-full" />
						</div>
					</div>

					{/* TV/Screen floating */}
					<div className="absolute top-2 right-4 w-20 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 flex items-center justify-center">
						<Play className="w-6 h-6 text-white" />
					</div>

					{/* Floating media icons */}
					<div
						className="absolute top-8 left-4 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg animate-bounce"
						style={{ animationDelay: "0s", animationDuration: "2s" }}
					>
						<Tv className="w-5 h-5 text-white" />
					</div>
					<div
						className="absolute top-20 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg animate-bounce"
						style={{ animationDelay: "0.3s", animationDuration: "2.5s" }}
					>
						<Radio className="w-4 h-4 text-white" />
					</div>
					<div
						className="absolute bottom-24 left-0 w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg animate-bounce"
						style={{ animationDelay: "0.6s", animationDuration: "2.2s" }}
					>
						<Film className="w-4 h-4 text-white" />
					</div>

					{/* Popcorn */}
					<div className="absolute bottom-8 right-8 w-8 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-t-lg">
						<div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-0.5">
							<div className="w-2 h-2 rounded-full bg-yellow-200" />
							<div className="w-2 h-2 rounded-full bg-yellow-100" />
							<div className="w-2 h-2 rounded-full bg-yellow-200" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
