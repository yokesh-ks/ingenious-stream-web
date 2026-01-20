"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getNativeScript, getLanguageInfo } from "@/lib/constants/language-data";
import type { Language } from "../actions";

interface LanguageGridProps {
	languages: Language[];
	languageColors: Record<string, string>;
}

export default function LanguageGrid({ languages, languageColors }: LanguageGridProps) {
	const router = useRouter();

	const handleLanguageClick = (slug: string) => {
		router.push(`/live-tv/${slug}`);
	};

	return (
		<>
			{/* Languages Grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
				{languages.map((language) => (
					<div
						key={language.slug}
						onClick={() => handleLanguageClick(language.slug)}
						className="group relative bg-gradient-to-br from-card to-muted/30 rounded-xl p-5 hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50 hover:-translate-y-1 overflow-hidden"
					>
						{/* Background Decoration */}
						<div
							className={cn(
								"absolute -right-6 -top-6 size-24 rounded-full opacity-10",
								languageColors[language.slug] || "bg-gray-500",
							)}
						/>

						{/* Language Icon */}
						<div className="relative flex justify-center mb-3">
							<div className="relative size-20">
								{/* Outer ring */}
								<div
									className={cn(
										"absolute inset-0 rounded-full opacity-20 blur-sm",
										languageColors[language.slug] || "bg-gray-500",
									)}
								/>
								{/* Main circle */}
								<div
									className={cn(
										"relative size-20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border-2 border-white/20",
										languageColors[language.slug] || "bg-gray-500",
									)}
								>
									<span className="text-3xl font-black text-white tracking-tighter">
										{getNativeScript(language.name)}
									</span>
								</div>
								{/* Accent dot */}
								<div
									className={cn(
										"absolute -top-1 -right-1 size-6 rounded-full border-2 border-background shadow-md",
										languageColors[language.slug] || "bg-gray-500",
									)}
								/>
							</div>
						</div>

						{/* Language Name */}
						<h3 className="text-base font-bold text-center mb-3">{language.name}</h3>

						{/* Channel Count */}
						<div className="text-center space-y-1">
							<div className="flex items-center justify-center gap-2">
								<span className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
									{language.count}
								</span>
							</div>
							<p className="text-xs text-muted-foreground font-medium">
								{language.count === 1 ? "Channel" : "Channels"}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
