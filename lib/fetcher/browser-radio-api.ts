/**
 * Browser Radio API Client
 * Direct API calls to radio-browser.info
 */

const RADIO_BROWSER_ENDPOINTS = [
  "https://de2.api.radio-browser.info/json",
  "https://fi1.api.radio-browser.info/json",
  "https://all.api.radio-browser.info/json"
];

// Use the first endpoint by default
const API_BASE = RADIO_BROWSER_ENDPOINTS[0];

export interface RadioStation {
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  tags: string;
  country: string;
  countrycode: string;
  state: string;
  language: string;
  languagecodes: string;
  votes: number;
  codec: string;
  bitrate: number;
  clickcount: number;
  clicktrend: number;
}

export interface GenreTag {
  name: string;
  stationcount: number;
}

export interface Country {
  name: string;
  stationcount: number;
  iso_3166_1: string;
}

export interface Language {
  name: string;
  stationcount: number;
  iso_639: string;
}

/**
 * Fetch top voted radio stations
 */
export async function getTopVotedStations(limit: number = 12): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${API_BASE}/stations/topvote/${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) throw new Error('Failed to fetch top voted stations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top voted stations:', error);
    return [];
  }
}

/**
 * Fetch top clicked (trending) radio stations
 */
export async function getTrendingStations(limit: number = 8): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${API_BASE}/stations/topclick/${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!response.ok) throw new Error('Failed to fetch trending stations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trending stations:', error);
    return [];
  }
}

/**
 * Search radio stations by name
 */
export async function searchStations(query: string, limit: number = 50): Promise<RadioStation[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetch(`${API_BASE}/stations/byname/${encodeURIComponent(query)}?limit=${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      }
    });

    if (!response.ok) throw new Error('Failed to search stations');
    return await response.json();
  } catch (error) {
    console.error('Error searching stations:', error);
    return [];
  }
}

/**
 * Fetch stations by genre/tag
 */
export async function getStationsByGenre(genre: string, limit: number = 50): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${API_BASE}/stations/bytag/${encodeURIComponent(genre)}?limit=${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error('Failed to fetch stations by genre');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations by genre:', error);
    return [];
  }
}

/**
 * Fetch stations by country
 */
export async function getStationsByCountry(country: string, limit: number = 50): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${API_BASE}/stations/bycountry/${encodeURIComponent(country)}?limit=${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error('Failed to fetch stations by country');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations by country:', error);
    return [];
  }
}

/**
 * Fetch stations by language
 */
export async function getStationsByLanguage(language: string, limit: number = 50): Promise<RadioStation[]> {
  try {
    const response = await fetch(`${API_BASE}/stations/bylanguage/${encodeURIComponent(language)}?limit=${limit}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error('Failed to fetch stations by language');
    return await response.json();
  } catch (error) {
    console.error('Error fetching stations by language:', error);
    return [];
  }
}

/**
 * Fetch all available genres/tags
 */
export async function getAllGenres(): Promise<GenreTag[]> {
  try {
    const response = await fetch(`${API_BASE}/tags?limit=1000&order=stationcount&reverse=true`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 86400 } // Cache for 24 hours
    });

    if (!response.ok) throw new Error('Failed to fetch genres');
    return await response.json();
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

/**
 * Fetch all available countries
 */
export async function getAllCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API_BASE}/countries?order=stationcount&reverse=true`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 86400 }
    });

    if (!response.ok) throw new Error('Failed to fetch countries');
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

/**
 * Fetch all available languages
 */
export async function getAllLanguages(): Promise<Language[]> {
  try {
    const response = await fetch(`${API_BASE}/languages?order=stationcount&reverse=true`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      },
      next: { revalidate: 86400 }
    });

    if (!response.ok) throw new Error('Failed to fetch languages');
    return await response.json();
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}

/**
 * Register a click for a station (increments clickcount)
 */
export async function registerStationClick(stationuuid: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/url/${stationuuid}`, {
      headers: {
        'User-Agent': 'RadioHub/1.0'
      }
    });
  } catch (error) {
    console.error('Error registering station click:', error);
  }
}

/**
 * Vote for a station
 */
export async function voteForStation(stationuuid: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/vote/${stationuuid}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'RadioHub/1.0'
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error voting for station:', error);
    return false;
  }
}
