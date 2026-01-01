const BASE_URL = "https://raw.githubusercontent.com/yokesh-ks/ingenious-stream-constants/refs/heads/main/tv";

export interface Language {
  name: string;
  slug: string;
  count: number;
}

export interface Channel {
  id: string;
  name: string;
  logo?: string;
}

export interface ChannelDetails {
  id: string;
  name: string;
  categoryId: string;
  streamUrl: string;
  tvgId: string;
  isActive: boolean;
  language: string;
  logo?: string;
}

/**
 * Fetch all available languages metadata
 */
export async function fetchLanguageMetadata(): Promise<Language[]> {
  try {
    const response = await fetch(`${BASE_URL}/language/_meta.json`, {
      cache: "force-cache",
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
 * Fetch channels for a specific language
 * @param slug - Language slug (e.g., "tamil", "hindi")
 */
export async function fetchChannelsByLanguage(slug: string): Promise<Channel[]> {
  try {
    const response = await fetch(`${BASE_URL}/language/${slug}.json`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch channels for ${slug}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading channels for ${slug}:`, error);
    return [];
  }
}

/**
 * Fetch detailed information for a specific channel
 * @param channelId - Channel ID (e.g., "6-tv-telugu")
 */
export async function fetchChannelDetails(channelId: string): Promise<ChannelDetails | null> {
  try {
    const response = await fetch(`${BASE_URL}/${channelId}.json`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch channel details for ${channelId}: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading channel details for ${channelId}:`, error);
    return null;
  }
}
