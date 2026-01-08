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
 * Fetch movies for a specific language
 * @param slug - Language slug (e.g., "tamil", "hindi")
 */
export async function fetchMoviesByLanguage(slug: string): Promise<Movie[]> {
	try {
		const response = await fetch(`${BASE_URL}/language/${slug}/_meta.json`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch movies for ${slug}: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error loading movies for ${slug}:`, error);
		return [];
	}
}
