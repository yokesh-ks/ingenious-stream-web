import { getMoviesByLanguage, getLanguages, getLanguagePaginationMetadata } from "../actions";
import MovieGrid from "./components/MovieGrid";
import Link from "next/link";

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
	const movies = await getMoviesByLanguage(slug, 0);
	const languageName = slug.charAt(0).toUpperCase() + slug.slice(1);
	const metadata = await getLanguagePaginationMetadata(slug);
	const hasNextPage = metadata && metadata.files > 1;

	return (
		<>
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

				{/* Pagination */}
				{movies.length > 0 && (
					<div className="flex justify-center items-center gap-4 py-8">
						<button
							disabled
							className="px-6 py-2 rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
						>
							Previous
						</button>
						<span className="text-sm text-muted-foreground">
							Page 1 {metadata && `of ${metadata.files}`}
						</span>
						{hasNextPage ? (
							<Link
								href={`/movies/${slug}/1`}
								className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
							>
								Next
							</Link>
						) : (
							<button
								disabled
								className="px-6 py-2 rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
							>
								Next
							</button>
						)}
					</div>
				)}
		</>
	);
}
