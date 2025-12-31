"use server";

import { getStationsByGenre, RadioStation } from '@/lib/fetcher/browser-radio-api';

export async function fetchStationsByGenre(genre: string): Promise<RadioStation[]> {
  try {
    return await getStationsByGenre(genre, 100);
  } catch (error) {
    console.error('Error fetching stations by genre:', error);
    return [];
  }
}
