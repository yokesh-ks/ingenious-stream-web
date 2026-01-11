const BASE_URL =
	"https://raw.githubusercontent.com/ingenious-clan/ingenious-stream-youtube/refs/heads/main/movies";

export interface Language {
	name: string;
	slug: string;
	count: number;
}

export interface Movie {
	id: string;
	name: string;
	videoId: string;
}

export interface LanguageMetadata {
	total: number;
	files: number;
	moviesPerFile: number;
	lastUpdated: string;
}

/**
 * Fetch all available movie languages metadata
 */
export async function fetchLanguageMetadata(): Promise<Language[]> {
	try {
		const response = await fetch(`${BASE_URL}/language/_meta.json`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch languages: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error loading languages:", error);
		return [];
	}
}

/**
 * Fetch metadata for a specific language (pagination info)
 * @param slug - Language slug (e.g., "tamil", "hindi")
 */
export async function fetchLanguagePaginationMetadata(
	slug: string
): Promise<LanguageMetadata | null> {
	try {
		const response = await fetch(`${BASE_URL}/language/${slug}/_meta.json`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch metadata for ${slug}: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error loading metadata for ${slug}:`, error);
		return null;
	}
}

/**
 * Fetch movies for a specific language
 * @param slug - Language slug (e.g., "tamil", "hindi")
 * @param page - Page number (defaults to 0 for 00.json, 1 for 01.json, etc.)
 */
export async function fetchMoviesByLanguage(
	slug: string,
	page: number = 0
): Promise<Movie[]> {
	try {
		const pageNumber = page.toString().padStart(2, "0");
		const response = await fetch(
			`${BASE_URL}/language/${slug}/${pageNumber}.json`,
			{
				next: { revalidate: 3600 },
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch movies for ${slug}: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error loading movies for ${slug}:`, error);
		return [];
	}
}
