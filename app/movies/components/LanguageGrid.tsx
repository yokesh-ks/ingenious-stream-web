"use client";

import { useRouter } from "next/navigation";
import { Film, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNativeScript } from "@/lib/constants/language-data";
import type { Language } from "../actions";

interface LanguageGridProps {
	languages: Language[];
	languageColors: Record<string, string>;
}

export default function LanguageGrid({ languages, languageColors }: LanguageGridProps) {
	const router = useRouter();

	const handleLanguageClick = (slug: string) => {
		router.push(`/movies/${slug}`);
	};

	return (
		<>
			{/* Languages Grid - Film Strip Style */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{languages.map((language) => (
					<div
						key={language.slug}
						onClick={() => handleLanguageClick(language.slug)}
						className="group relative bg-card rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border hover:border-primary/50 hover:scale-[1.02]"
					>
						{/* Film Strip Holes (Top) */}
						<div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-background/80 to-transparent flex justify-around items-center px-2 z-10">
							{[...Array(12)].map((_, i) => (
								<div key={i} className="size-1.5 rounded-full bg-muted" />
							))}
						</div>

						{/* Main Content */}
						<div className="relative p-6 pt-8">
							{/* Film Reel Icon Background */}
							<div className="absolute right-4 top-4 opacity-5">
								<Film className="size-24" />
							</div>

							<div className="relative flex items-center gap-4">
								{/* Film Clapperboard Style Icon */}
								<div className="relative">
									{/* Clapperboard base */}
									<div
										className={cn(
											"size-20 rounded-lg flex flex-col overflow-hidden shadow-lg border-2 border-background",
											languageColors[language.slug] || "bg-gray-500",
										)}
									>
										{/* Clapperboard stripes */}
										<div className="h-6 bg-gradient-to-r from-black/40 via-white/20 to-black/40 flex items-center justify-around">
											<div className="h-4 w-1 bg-white/40 rounded-full" />
											<div className="h-4 w-1 bg-white/40 rounded-full" />
											<div className="h-4 w-1 bg-white/40 rounded-full" />
										</div>
										{/* Language initials */}
										<div className="flex-1 flex items-center justify-center">
											<span className="text-2xl font-black text-white drop-shadow-md">
												{getNativeScript(language.name)}
											</span>
										</div>
									</div>

									{/* Play button overlay on hover */}
									<div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg">
										<PlayCircle className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
									</div>
								</div>

								{/* Language Info */}
								<div className="flex-1">
									<h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
										{language.name}
									</h3>
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
											{language.count}
										</span>
										<span className="text-sm text-muted-foreground font-medium">
											{language.count === 1 ? "Movie" : "Movies"}
										</span>
									</div>
								</div>
							</div>

							{/* Subtle shine effect on hover */}
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 group-hover:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
						</div>

						{/* Film Strip Holes (Bottom) */}
						<div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-background/80 to-transparent flex justify-around items-center px-2">
							{[...Array(12)].map((_, i) => (
								<div key={i} className="size-1.5 rounded-full bg-muted" />
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
