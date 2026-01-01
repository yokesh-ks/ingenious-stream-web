import LanguageGrid from "./components/LanguageGrid";
import { getLanguages } from "./actions";

const languageColors: Record<string, string> = {
	tamil: "bg-orange-500",
	telugu: "bg-blue-500",
	kannada: "bg-purple-500",
	malayalam: "bg-green-500",
	assamese: "bg-pink-500",
	bengali: "bg-yellow-500",
	bhojpuri: "bg-red-500",
	english: "bg-indigo-500",
	gujarati: "bg-teal-500",
	hindi: "bg-rose-500",
	marathi: "bg-cyan-500",
	odia: "bg-amber-500",
	punjabi: "bg-lime-500",
	urdu: "bg-violet-500",
};

export default async function LiveTVPage() {
	const languages = await getLanguages();

	return (
		<div className="p-6 space-y-8">
			{/* Language Grid Component */}
			<LanguageGrid languages={languages} languageColors={languageColors} />

			{/* Total Channels Count */}
			{languages.length > 0 && (
				<div className="text-center pt-8 border-t">
					<p className="text-sm text-muted-foreground">
						Total of{" "}
						<span className="font-semibold text-foreground">
							{languages.reduce((sum, lang) => sum + lang.count, 0)}
						</span>{" "}
						channels across{" "}
						<span className="font-semibold text-foreground">{languages.length}</span> languages
					</p>
				</div>
			)}
		</div>
	);
}
