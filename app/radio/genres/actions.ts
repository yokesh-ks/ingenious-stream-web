import { getAllGenres, GenreTag } from '@/lib/fetcher/browser-radio-api';

export async function fetchAllGenres(): Promise<GenreTag[]> {
  try {
    const genres = await getAllGenres();
    // Filter genres with at least 5 stations
    return genres.filter(g => g.stationcount >= 5);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}
