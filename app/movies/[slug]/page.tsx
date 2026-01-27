import { getMoviesByLanguage, getLanguages, getLanguagePaginationMetadata } from "../actions";
import MovieGrid from "./components/MovieGrid";
import Link from "next/link";

interface MovieLanguagePageProps {
	params: Promise<{
		slug: string;
	}>;
	searchParams: Promise<{
		page?: string;
	}>;
}

export async function generateStaticParams() {
	const languages = await getLanguages();
	return languages.map((language) => ({
		slug: language.slug,
	}));
}

export default async function MovieLanguagePage({ params, searchParams }: MovieLanguagePageProps) {
	const { slug } = await params;
	const { page } = await searchParams;
	const pageNumber = page ? parseInt(page, 10) : 0;
	const movies = await getMoviesByLanguage(slug, pageNumber);
	const languageName = slug.charAt(0).toUpperCase() + slug.slice(1);
	const metadata = await getLanguagePaginationMetadata(slug);
	const totalPages = metadata?.files || 1;
	const currentPage = pageNumber + 1; // Display as 1-indexed
	const hasNextPage = pageNumber < totalPages - 1;
	const hasPreviousPage = pageNumber > 0;

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
					{hasPreviousPage ? (
						<Link
							href={pageNumber === 1 ? `/movies/${slug}` : `/movies/${slug}?page=${pageNumber - 1}`}
							className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						>
							Previous
						</Link>
					) : (
						<button
							disabled
							className="px-6 py-2 rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
						>
							Previous
						</button>
					)}
					<span className="text-sm text-muted-foreground">
						Page {currentPage} of {totalPages}
					</span>
					{hasNextPage ? (
						<Link
							href={`/movies/${slug}?page=${pageNumber + 1}`}
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
