"use server";

import { getAllLanguages, Language } from '@/lib/fetcher/browser-radio-api';

export async function fetchAllLanguages(): Promise<Language[]> {
  try {
    const languages = await getAllLanguages();
    // Filter languages with at least 5 stations
    return languages.filter(l => l.stationcount >= 5);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}
