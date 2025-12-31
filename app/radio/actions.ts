"use server";

import {
  getTopVotedStations,
  getTrendingStations,
  searchStations,
  getStationsByGenre,
  getStationsByCountry,
  getStationsByLanguage,
  getAllGenres,
  getAllCountries,
  getAllLanguages,
  RadioStation,
  GenreTag,
  Country,
  Language
} from '@/lib/fetcher/browser-radio-api';

export async function fetchHomePageData() {
  try {
    const [topStations, trendingStations] = await Promise.all([
      getTopVotedStations(12),
      getTrendingStations(8)
    ]);

    return {
      topStations,
      trendingStations
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      topStations: [],
      trendingStations: []
    };
  }
}

export async function searchRadioStations(query: string): Promise<RadioStation[]> {
  if (!query.trim()) return [];
  return await searchStations(query, 50);
}

export async function fetchStationsByGenre(genre: string): Promise<RadioStation[]> {
  return await getStationsByGenre(genre, 50);
}

export async function fetchStationsByCountry(country: string): Promise<RadioStation[]> {
  return await getStationsByCountry(country, 50);
}

export async function fetchStationsByLanguage(language: string): Promise<RadioStation[]> {
  return await getStationsByLanguage(language, 50);
}

export async function fetchAllGenres(): Promise<GenreTag[]> {
  return await getAllGenres();
}

export async function fetchAllCountries(): Promise<Country[]> {
  return await getAllCountries();
}

export async function fetchAllLanguages(): Promise<Language[]> {
  return await getAllLanguages();
}
