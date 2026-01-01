"use client";

import { Search, Star, ChevronLeft, ChevronRight, MoreVertical, Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const moviesNavItems = [
	{ label: "All Movies", active: true },
	{ label: "Now Playing", active: false },
	{ label: "Upcoming", active: false },
	{ label: "Top Rated", active: false },
	{ label: "Favourites", active: false },
];

const popularMovies = [
	{
		title: "The Matrix Resurrections",
		genre: "Sci-Fi, Action",
		rating: "4.7",
		year: "2024",
		duration: "148 min",
		image: "/movies/matrix.png",
	},
	{
		title: "Dune: Part Two",
		genre: "Sci-Fi, Adventure",
		rating: "4.9",
		year: "2024",
		duration: "166 min",
		image: "/movies/dune.png",
	},
	{
		title: "Oppenheimer",
		genre: "Biography, Drama",
		rating: "4.8",
		year: "2023",
		duration: "180 min",
		image: "/movies/oppenheimer.png",
	},
	{
		title: "Guardians of the Galaxy Vol. 3",
		genre: "Action, Comedy",
		rating: "4.5",
		year: "2023",
		duration: "150 min",
		image: "/movies/gotg.png",
	},
	{
		title: "The Holdovers",
		genre: "Comedy, Drama",
		rating: "4.6",
		year: "2023",
		duration: "133 min",
		image: "/movies/holdovers.png",
	},
	{
		title: "Poor Things",
		genre: "Comedy, Drama",
		rating: "4.4",
		year: "2023",
		duration: "141 min",
		image: "/movies/poor-things.png",
	},
];

const nowPlayingMovies = [
	{ title: "Inception", genre: "Sci-Fi Thriller", duration: "148 min", year: "2010" },
	{ title: "The Dark Knight", genre: "Action Thriller", duration: "152 min", year: "2008" },
	{ title: "Interstellar", genre: "Sci-Fi Drama", duration: "169 min", year: "2014" },
	{ title: "The Prestige", genre: "Mystery Thriller", duration: "130 min", year: "2006" },
];

const movieGenres = [
	{ name: "Action", icon: "💥", color: "bg-red-500" },
	{ name: "Comedy", icon: "😂", color: "bg-yellow-500" },
	{ name: "Drama", icon: "🎭", color: "bg-purple-500" },
	{ name: "Sci-Fi", icon: "🚀", color: "bg-blue-500" },
	{ name: "Horror", icon: "👻", color: "bg-gray-800" },
	{ name: "Romance", icon: "❤️", color: "bg-pink-500" },
	{ name: "Thriller", icon: "🔪", color: "bg-indigo-600" },
	{ name: "Animation", icon: "🎨", color: "bg-green-500" },
];

export default function MoviesPage() {
	return (
		<div className="w-full h-full overflow-y-auto bg-background">
			<div className="max-w-[1400px] mx-auto p-6 space-y-6">
				{/* Search Bar */}
				<div className="relative max-w-xs">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input placeholder="Search movies..." className="pl-9 bg-muted/50 border-0" />
				</div>

				{/* Movies Navigation */}
				<div>
					<h2 className="text-sm text-muted-foreground mb-3">Movies</h2>
					<div className="flex gap-2 flex-wrap">
						{moviesNavItems.map((item) => (
							<Button
								key={item.label}
								variant={item.active ? "default" : "ghost"}
								className={cn("gap-2", item.active && "bg-primary text-primary-foreground")}
							>
								<span className="size-4 flex items-center justify-center">
									{item.label === "All Movies" && "🎬"}
									{item.label === "Now Playing" && "▶️"}
									{item.label === "Upcoming" && "📅"}
									{item.label === "Top Rated" && "⭐"}
									{item.label === "Favourites" && "❤️"}
								</span>
								{item.label}
							</Button>
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Banner and Popular Movies */}
					<div className="lg:col-span-2 space-y-6">
						{/* Banner */}
						<div className="relative h-[200px] rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 p-8">
							<div className="relative z-10">
								<h1 className="text-4xl font-bold text-white mb-2">
									Live<span className="text-yellow-400"> Movie</span>
								</h1>
								<h1 className="text-4xl font-bold text-yellow-400">Streaming</h1>
								<p className="text-white/80 mt-2 text-sm">
									Watch your favorite movies anytime, anywhere
								</p>
							</div>
							<div className="absolute right-8 bottom-0 h-full flex items-end">
								<div className="relative w-32 h-40">
									<div className="absolute inset-0 bg-white/10 rounded-t-full" />
									<div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl">🎬</div>
								</div>
							</div>
							<div className="absolute top-8 right-1/3 text-white text-2xl">🍿 🎥 ✨</div>
							<div className="absolute bottom-8 left-1/3 text-white/50">⭐</div>
						</div>

						{/* Popular Movies */}
						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold">Popular Movies</h2>
								<div className="flex gap-2">
									<Button variant="ghost" size="icon" className="size-8 rounded-full">
										<ChevronLeft className="size-4" />
									</Button>
									<Button variant="ghost" size="icon" className="size-8 rounded-full">
										<ChevronRight className="size-4" />
									</Button>
								</div>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
								{popularMovies.map((movie) => (
									<div
										key={movie.title}
										className="group relative bg-card rounded-2xl p-4 hover:bg-muted/50 transition-colors cursor-pointer"
									>
										<div className="relative aspect-[2/3] rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-3 flex items-center justify-center text-4xl overflow-hidden">
											🎬
											<div className="absolute top-2 right-2 bg-white rounded-full px-2 py-0.5 flex items-center gap-1">
												<Star className="size-3 fill-yellow-400 text-yellow-400" />
												<span className="text-xs font-medium">{movie.rating}</span>
											</div>
											<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
												<Button
													size="icon"
													className="size-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
												>
													<Play className="size-6 fill-current" />
												</Button>
											</div>
										</div>
										<h3 className="font-semibold text-sm mb-1 line-clamp-1">{movie.title}</h3>
										<p className="text-xs text-muted-foreground line-clamp-1">{movie.genre}</p>
										<div className="flex items-center gap-2 mt-1">
											<Badge variant="secondary" className="text-xs px-1.5 py-0">
												{movie.year}
											</Badge>
											<span className="text-xs text-muted-foreground flex items-center gap-1">
												<Clock className="size-3" />
												{movie.duration}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Now Playing */}
						<div className="bg-card rounded-2xl p-6">
							<div className="flex items-center justify-between mb-4">
								<div>
									<h2 className="text-xl font-semibold">Now Playing</h2>
									<p className="text-sm text-muted-foreground">
										Currently streaming live on Cinema Plus
									</p>
								</div>
								<Button variant="ghost" className="text-sm">
									See All
									<ChevronRight className="size-4 ml-1" />
								</Button>
							</div>
							<div className="space-y-3">
								{nowPlayingMovies.map((movie, index) => (
									<div
										key={index}
										className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
									>
										<div className="relative size-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0 overflow-hidden">
											<div className="absolute inset-0 flex items-center justify-center text-xl">
												🎬
											</div>
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-medium text-sm line-clamp-1">{movie.title}</h3>
											<p className="text-xs text-muted-foreground">{movie.genre}</p>
										</div>
										<div className="flex items-center gap-3">
											<span className="text-sm text-muted-foreground flex items-center gap-1">
												<Clock className="size-3" />
												{movie.duration}
											</span>
											<span className="text-xs text-muted-foreground">{movie.year}</span>
											<Button
												variant="ghost"
												size="icon"
												className="size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<Star className="size-4" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="size-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
											>
												<Play className="size-4 fill-current" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="size-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<MoreVertical className="size-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Right Column - User Profile and Genre Recommendations */}
					<div className="space-y-6">
						{/* User Profile */}
						<div className="bg-card rounded-2xl p-6">
							<div className="flex items-start justify-between mb-4">
								<div className="flex items-center gap-3">
									<Avatar className="size-12">
										<AvatarImage src="/avatar.png" />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="font-semibold">John Doe</h3>
										<p className="text-xs text-muted-foreground">Premium Member</p>
									</div>
								</div>
								<Button variant="ghost" size="icon" className="size-8">
									<MoreVertical className="size-4" />
								</Button>
							</div>
							<div className="flex items-center gap-4 text-sm mb-4">
								<div>
									<span className="font-semibold">240</span>
									<span className="text-muted-foreground ml-1">Movies</span>
								</div>
								<div>
									<span className="font-semibold">2.8K</span>
									<span className="text-muted-foreground ml-1">Hours</span>
								</div>
							</div>
							<div className="flex gap-2">
								<div className="size-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
									🏆
								</div>
								<div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
									🎬
								</div>
								<div className="size-8 rounded-full bg-pink-500/20 flex items-center justify-center">
									❤️
								</div>
							</div>
						</div>

						{/* Browse by Genre */}
						<div className="bg-card rounded-2xl p-6">
							<h2 className="text-xl font-semibold mb-4">Browse by Genre</h2>
							<div className="grid grid-cols-2 gap-4">
								{movieGenres.map((genre) => (
									<div
										key={genre.name}
										className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
									>
										<div
											className={cn(
												"size-16 rounded-2xl flex items-center justify-center text-2xl",
												genre.color,
											)}
										>
											{genre.icon}
										</div>
										<span className="text-sm font-medium">{genre.name}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
