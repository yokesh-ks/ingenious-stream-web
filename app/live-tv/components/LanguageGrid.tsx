"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Language } from "../actions";

interface LanguageGridProps {
	languages: Language[];
	languageColors: Record<string, string>;
}

export default function LanguageGrid({ languages, languageColors }: LanguageGridProps) {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const handleLanguageClick = (slug: string) => {
		router.push(`/live-tv/${slug}`);
	};

	const filteredLanguages = languages.filter((language) =>
		language.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			{/* Search Bar */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input
					placeholder="Search languages..."
					className="pl-9 bg-muted/50 border-0"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Languages Grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
				{filteredLanguages.map((language) => (
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
									<span className="text-2xl font-black text-white tracking-tighter">
										{language.name.substring(0, 2).toUpperCase()}
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

			{/* No Results */}
			{filteredLanguages.length === 0 && (
				<div className="text-center py-20">
					<p className="text-muted-foreground">No languages found matching "{searchQuery}"</p>
				</div>
			)}
		</>
	);
}
