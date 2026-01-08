import LanguageGrid from "./components/LanguageGrid";
import { getLanguages } from "./actions";

const languageColors: Record<string, string> = {
	tamil: "bg-gradient-to-br from-orange-600 to-orange-400",
	telugu: "bg-gradient-to-br from-blue-600 to-blue-400",
	kannada: "bg-gradient-to-br from-purple-600 to-purple-400",
	malayalam: "bg-gradient-to-br from-green-600 to-green-400",
	hindi: "bg-gradient-to-br from-rose-600 to-rose-400",
	english: "bg-gradient-to-br from-indigo-600 to-indigo-400",
	bengali: "bg-gradient-to-br from-yellow-600 to-yellow-400",
	marathi: "bg-gradient-to-br from-cyan-600 to-cyan-400",
	gujarati: "bg-gradient-to-br from-teal-600 to-teal-400",
	punjabi: "bg-gradient-to-br from-lime-600 to-lime-400",
};

export default async function MoviesPage() {
	const languages = await getLanguages();

	return (
		<div className="w-full h-full overflow-y-auto bg-background">
			<div className="max-w-[1400px] mx-auto p-6 space-y-8">
				{/* Language Grid Component */}
				<LanguageGrid languages={languages} languageColors={languageColors} />
			</div>
		</div>
	);
}
