import {
	fetchLanguageMetadata,
	fetchMoviesByLanguage,
	type Language,
	type Movie,
} from "@/lib/fetcher/movie-apis";

export type { Language, Movie };

export async function getLanguages(): Promise<Language[]> {
	return fetchLanguageMetadata();
}

export async function getMoviesByLanguage(slug: string): Promise<Movie[]> {
	return fetchMoviesByLanguage(slug);
}
