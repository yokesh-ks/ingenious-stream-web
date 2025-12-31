"use server";

import { getStationsByLanguage, RadioStation } from '@/lib/fetcher/browser-radio-api';

export async function fetchStationsByLanguage(language: string): Promise<RadioStation[]> {
  try {
    return await getStationsByLanguage(language, 300);
  } catch (error) {
    console.error('Error fetching stations by language:', error);
    return [];
  }
}
