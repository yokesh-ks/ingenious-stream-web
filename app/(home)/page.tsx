import Link from "next/link";

export default function Home() {
	return (
		<div className="w-full h-full overflow-y-auto bg-background">
			<div className="max-w-[1400px] mx-auto p-6 space-y-8">
				{/* Hero Title */}
				<div className="text-center space-y-2 py-8">
					<h1 className="text-4xl md:text-5xl font-bold">
						Welcome to <span className="text-purple-600">Ingenious Streams</span>
					</h1>
					<p className="text-muted-foreground text-lg">Your gateway to endless entertainment</p>
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Card One: Discover Movies */}
					<Link href="/movies" className="group">
						<div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 p-8 h-[280px] transition-transform duration-300 hover:scale-105 cursor-pointer">
							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<h2 className="text-3xl font-bold text-white mb-3">
										Discover <span className="text-yellow-400">Movies</span>
									</h2>
									<p className="text-white/90 text-sm">
										Stream your favorite movies in multiple languages
									</p>
								</div>
								<div className="flex items-center gap-4 text-white/80 text-xs">
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-green-400" />
										<span>Available Now</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-yellow-400" />
										<span>HD Quality</span>
									</div>
								</div>
							</div>
							<div className="absolute right-6 bottom-4 text-8xl opacity-20">🎬</div>
							<div className="absolute top-6 right-1/4 text-white text-2xl opacity-30">🍿</div>
							<div className="absolute bottom-6 right-1/3 text-white text-xl opacity-30">⭐</div>
						</div>
					</Link>

					{/* Card Two: Listen Radio */}
					<Link href="/radio" className="group">
						<div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 p-8 h-[280px] transition-transform duration-300 hover:scale-105 cursor-pointer">
							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<h2 className="text-3xl font-bold text-white mb-3">
										Listen <span className="text-yellow-400">Radio</span>
									</h2>
									<p className="text-white/90 text-sm">
										Tune into live radio stations from around the world
									</p>
								</div>
								<div className="flex items-center gap-4 text-white/80 text-xs">
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-green-400" />
										<span>Live Streaming</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-yellow-400" />
										<span>Multiple Genres</span>
									</div>
								</div>
							</div>
							<div className="absolute right-6 bottom-4 text-8xl opacity-20">📻</div>
							<div className="absolute top-6 right-1/4 text-white text-2xl opacity-30">🎵</div>
							<div className="absolute bottom-6 right-1/3 text-white text-xl opacity-30">🎧</div>
						</div>
					</Link>

					{/* Card Three: Watch Live TV */}
					<Link href="/live-tv" className="group">
						<div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-900 via-orange-700 to-red-600 p-8 h-[280px] transition-transform duration-300 hover:scale-105 cursor-pointer">
							<div className="relative z-10 h-full flex flex-col justify-between">
								<div>
									<h2 className="text-3xl font-bold text-white mb-3">
										Watch <span className="text-yellow-400">Live TV</span>
									</h2>
									<p className="text-white/90 text-sm">Stream live TV channels in real-time</p>
								</div>
								<div className="flex items-center gap-4 text-white/80 text-xs">
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-green-400" />
										<span>Live Now</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="size-2 rounded-full bg-yellow-400" />
										<span>HD Channels</span>
									</div>
								</div>
							</div>
							<div className="absolute right-6 bottom-4 text-8xl opacity-20">📺</div>
							<div className="absolute top-6 right-1/4 text-white text-2xl opacity-30">🎪</div>
							<div className="absolute bottom-6 right-1/3 text-white text-xl opacity-30">🎭</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
