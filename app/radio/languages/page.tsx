import { Languages } from "lucide-react";
import { LanguageCard } from "@/components/radio/language-card";
import { fetchAllLanguages } from "./actions";

export default async function LanguagesPage() {
	const languages = await fetchAllLanguages();

	return (
		<div className="min-h-screen pb-32 bg-background">
			<section className="px-4 sm:px-8 pt-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center gap-3 mb-8">
						<Languages className="w-6 h-6 text-primary" />
						<div>
							<h1 className="text-2xl font-bold">All Languages</h1>
							<p className="text-sm text-muted-foreground mt-1">
								Browse {languages.length} languages
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{languages.map((lang, i) => (
							<LanguageCard
								key={lang.name}
								language={lang.name}
								stationCount={lang.stationcount}
								index={i}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
