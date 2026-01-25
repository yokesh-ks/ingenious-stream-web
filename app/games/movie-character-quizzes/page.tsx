import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "./_sections/hero-section";
import { quizCards } from "./_constants/quiz-cards";

// Generate random color classes for dynamic appearance
const getRandomColorClasses = () => {
	const colorThemes = [
		{
			gradient: "from-blue-500 to-purple-600",
			border: "border-blue-500/50",
			accent: "bg-blue-500",
		},
		{
			gradient: "from-green-500 to-blue-500",
			border: "border-green-500/50",
			accent: "bg-green-500",
		},
		{
			gradient: "from-indigo-500 to-purple-500",
			border: "border-indigo-500/50",
			accent: "bg-indigo-500",
		},
		{
			gradient: "from-teal-400 to-blue-500",
			border: "border-teal-500/50",
			accent: "bg-teal-500",
		},
		{
			gradient: "from-emerald-500 to-cyan-500",
			border: "border-emerald-500/50",
			accent: "bg-emerald-500",
		},
		{
			gradient: "from-sky-500 to-blue-600",
			border: "border-sky-500/50",
			accent: "bg-sky-500",
		},
		{
			gradient: "from-violet-500 to-purple-600",
			border: "border-violet-500/50",
			accent: "bg-violet-500",
		},
		{
			gradient: "from-lime-400 to-green-500",
			border: "border-lime-500/50",
			accent: "bg-lime-500",
		},
	];

	const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)];

	return randomTheme;
};

export default function MovieCharacterQuizzesPage() {
	return (
		<div className="p-4 space-y-4">
			{/* Hero Banner */}
			<HeroSection />

			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
				{quizCards.map((card) => {
					const { gradient, border, accent } = getRandomColorClasses();

					return (
						<Link
							key={card.id}
							href={`/games/movie-character-quizzes/${card.id}`}
							className={`block relative overflow-hidden rounded-2xl p-6 bg-white shadow-lg border-2 ${border} group`}
						>
							<div className="relative z-10">
								<h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
									{card.title}
								</h2>
							</div>

							{/* Hover arrow indicator */}
							<div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								<div className={`p-2 rounded-full bg-gradient-to-br ${gradient} shadow-lg`}>
									<ArrowRight className="h-4 w-4 text-white" />
								</div>
							</div>

							{/* Corner accent */}
							<div
								className={`absolute top-0 right-0 w-16 h-16 ${accent} opacity-20 rounded-bl-full transform translate-x-4 -translate-y-4`}
							></div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
