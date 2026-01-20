import Link from "next/link";
import { Puzzle, Gamepad2, Trophy, Sparkles, ArrowRight, Play } from "lucide-react";

type Game = {
	id: string;
	title: string;
	description: string;
	icon: typeof Puzzle | typeof Gamepad2 | typeof Trophy;
	href: string;
	gradient: string;
	bgGlow: string;
	featured: boolean;
	comingSoon?: boolean;
};

export function GameCard({ game }: { game: Game }) {
	const Icon = game.icon;

	return (
		<div className="group relative">
			{/* Glow Effect */}
			<div
				className={`absolute -inset-1 ${game.bgGlow} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
			/>

			<div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-transparent transition-all duration-300">
				{/* Gradient Header */}
				<div
					className={`relative h-40 bg-gradient-to-br ${game.gradient} p-6 flex items-center justify-center`}
				>
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

					<div className="relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
						<Icon className="w-10 h-10 text-white" />
					</div>

					{/* Coming Soon Badge */}
					{game.comingSoon && (
						<div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-xl rounded-full text-xs font-medium text-white">
							Coming Soon
						</div>
					)}

					{/* Featured Badge */}
					{game.featured && (
						<div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-xs font-medium text-white flex items-center gap-1">
							<Sparkles className="w-3 h-3" />
							Featured
						</div>
					)}
				</div>

				{/* Content */}
				<div className="p-6">
					<h3 className="text-xl font-bold text-foreground mb-2">{game.title}</h3>
					<p className="text-muted-foreground text-sm mb-4">{game.description}</p>

					{game.comingSoon ? (
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="text-sm font-medium">Stay tuned</span>
						</div>
					) : (
						<Link
							href={game.href}
							className={`inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${game.gradient} text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group/btn`}
						>
							<Play className="w-4 h-4" />
							Play Now
							<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
