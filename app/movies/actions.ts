import {
	fetchLanguageMetadata,
	fetchLanguagePaginationMetadata,
	fetchMoviesByLanguage,
	type Language,
	type LanguageMetadata,
	type Movie,
} from "@/lib/fetcher/movie-apis";

export type { Language, LanguageMetadata, Movie };

export async function getLanguages(): Promise<Language[]> {
	return fetchLanguageMetadata();
}

export async function getLanguagePaginationMetadata(
	slug: string,
): Promise<LanguageMetadata | null> {
	return fetchLanguagePaginationMetadata(slug);
}

export async function getMoviesByLanguage(slug: string, page: number = 0): Promise<Movie[]> {
	return fetchMoviesByLanguage(slug, page);
}
