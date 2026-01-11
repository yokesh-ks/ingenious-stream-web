import {
	getLanguages,
	getLanguagePaginationMetadata,
	getMoviesByLanguage,
} from "../../actions";
import MovieGrid from "../components/MovieGrid";
import Link from "next/link";

interface MovieLanguagePageProps {
	params: Promise<{
		slug: string;
		page: string;
	}>;
}

export async function generateStaticParams() {
	const languages = await getLanguages();
	const params: { slug: string; page: string }[] = [];

	for (const language of languages) {
		const metadata = await getLanguagePaginationMetadata(language.slug);

		if (metadata && metadata.files > 1) {
			// Generate page numbers starting from 1 (since 0 is handled by [slug]/page.tsx)
			for (let i = 1; i < metadata.files; i++) {
				params.push({
					slug: language.slug,
					page: i.toString(),
				});
			}
		}
	}

	return params;
}

export default async function MovieLanguagePageWithPagination({
	params,
}: MovieLanguagePageProps) {
	const { slug, page } = await params;
	const pageNumber = parseInt(page, 10);
	const movies = await getMoviesByLanguage(slug, pageNumber);
	const languageName = slug.charAt(0).toUpperCase() + slug.slice(1);
	const metadata = await getLanguagePaginationMetadata(slug);
	const totalPages = metadata?.files || 1;
	const currentPage = pageNumber + 1; // Display as 1-indexed
	const hasNextPage = pageNumber < totalPages - 1;
	const hasPreviousPage = pageNumber > 0;

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

				{/* Pagination */}
				{movies.length > 0 && (
					<div className="flex justify-center items-center gap-4 py-8">
						{hasPreviousPage ? (
							<Link
								href={
									pageNumber === 1
										? `/movies/${slug}`
										: `/movies/${slug}/${pageNumber - 1}`
								}
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
								href={`/movies/${slug}/${pageNumber + 1}`}
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
			</div>
		</div>
	);
}
