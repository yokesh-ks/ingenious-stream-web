import { Puzzle, Gamepad2, Trophy } from "lucide-react";

export const games = [
	{
		id: "jigsaw-puzzle",
		title: "Jigsaw Puzzle",
		description: "Solve beautiful puzzles from movie posters and celebrity photos",
		icon: Puzzle,
		href: "/games/jigsaw-puzzle",
		gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
		bgGlow: "bg-purple-500/20",
		featured: true,
	},
	{
		id: "movie-character-quizzes",
		title: "Movie Character Quizzes",
		description: "Test your movie knowledge with fun trivia questions",
		icon: Trophy,
		href: "/games/movie-character-quizzes",
		gradient: "from-amber-500 via-orange-500 to-red-500",
		bgGlow: "bg-orange-500/20",
		featured: false,
		comingSoon: false,
	},
	{
		id: "memory",
		title: "Memory Match",
		description: "Match pairs of movie posters and celebrity faces",
		icon: Gamepad2,
		href: "#",
		gradient: "from-cyan-500 via-blue-500 to-indigo-500",
		bgGlow: "bg-blue-500/20",
		featured: false,
		comingSoon: true,
	},
];
