import { getMoviesByLanguage, getLanguages } from "../actions";
import MovieGrid from "./components/MovieGrid";

interface MovieLanguagePageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const languages = await getLanguages();
	return languages.map((language) => ({
		slug: language.slug,
	}));
}

export default async function MovieLanguagePage({ params }: MovieLanguagePageProps) {
	const { slug } = await params;
	const movies = await getMoviesByLanguage(slug);
	const languageName = slug.charAt(0).toUpperCase() + slug.slice(1);

	return (
		<div className="w-full h-full overflow-y-auto bg-background">
			<div className="max-w-[1400px] mx-auto p-6 space-y-6">
				{/* Header */}
				<div className="space-y-2">
					<h1 className="text-3xl font-bold">{languageName} Movies</h1>
					{movies.length > 0 ? (
						<p className="text-muted-foreground">
							Explore {movies.length} amazing {languageName} movies
						</p>
					) : (
						<p className="text-muted-foreground">No movies available yet. Check back soon!</p>
					)}
				</div>

				{/* Movie Grid */}
				{movies.length > 0 ? (
					<MovieGrid movies={movies} language={slug} />
				) : (
					<div className="text-center py-20">
						<div className="text-6xl mb-4">🎬</div>
						<h3 className="text-xl font-semibold mb-2">No Movies Yet</h3>
						<p className="text-muted-foreground">
							We're working on adding more {languageName} movies. Stay tuned!
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
