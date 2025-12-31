/**
 * Live TV API Client
 * Fetches live TV channels organized by language
 */

const JIO_TV_BASE_URL = "https://jiotvapi.cdn.jio.com/apis/v1.3";
const JIO_TV_SEARCH_API = "https://tv.media.jio.com/apis/v2.3/search/search";

export interface LiveTVChannel {
  channel_id: number;
  channel_name: string;
  logoUrl: string;
  channelCategory: string;
  channelCategoryId: number;
  isHD: boolean;
  is_premium: boolean;
  channelLanguageId: number;
  language?: string;
  rating?: number;
  viewerCount?: number;
  isLive?: boolean;
  currentProgram?: string;
}

export interface LanguageMetadata {
  slug: string;
  name: string;
  channelCount: number;
}

export interface ChannelsByLanguage {
  language: string;
  channels: LiveTVChannel[];
}

// Mock data for demonstration (replace with actual API calls)
const LANGUAGE_METADATA: LanguageMetadata[] = [
  { slug: "tamil", name: "Tamil", channelCount: 150 },
  { slug: "telugu", name: "Telugu", channelCount: 120 },
  { slug: "hindi", name: "Hindi", channelCount: 200 },
  { slug: "malayalam", name: "Malayalam", channelCount: 80 },
  { slug: "kannada", name: "Kannada", channelCount: 90 },
  { slug: "english", name: "English", channelCount: 180 },
];

// Sample channel data for each language
const MOCK_CHANNELS: Record<string, LiveTVChannel[]> = {
  tamil: [
    {
      channel_id: 1001,
      channel_name: "Sun TV",
      logoUrl: "/channels/sun-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 1,
      language: "Tamil",
      rating: 4.8,
      viewerCount: 125000,
      isLive: true,
      currentProgram: "Kalyana Veedu"
    },
    {
      channel_id: 1002,
      channel_name: "Vijay TV",
      logoUrl: "/channels/vijay-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 1,
      language: "Tamil",
      rating: 4.7,
      viewerCount: 110000,
      isLive: true,
      currentProgram: "Bigg Boss Tamil"
    },
    {
      channel_id: 1003,
      channel_name: "Zee Tamil",
      logoUrl: "/channels/zee-tamil.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 1,
      language: "Tamil",
      rating: 4.6,
      viewerCount: 95000,
      isLive: true,
      currentProgram: "Sa Re Ga Ma Pa"
    },
    {
      channel_id: 1004,
      channel_name: "Colors Tamil",
      logoUrl: "/channels/colors-tamil.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 1,
      language: "Tamil",
      rating: 4.5,
      viewerCount: 88000,
      isLive: true,
      currentProgram: "Tamil Selvi"
    },
    {
      channel_id: 1005,
      channel_name: "KTV",
      logoUrl: "/channels/ktv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: false,
      is_premium: false,
      channelLanguageId: 1,
      language: "Tamil",
      rating: 4.3,
      viewerCount: 72000,
      isLive: true,
      currentProgram: "Vinayagar"
    },
  ],
  telugu: [
    {
      channel_id: 2001,
      channel_name: "Gemini TV",
      logoUrl: "/channels/gemini-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 2,
      language: "Telugu",
      rating: 4.7,
      viewerCount: 105000,
      isLive: true,
      currentProgram: "Evare Nuvvu Mohini"
    },
    {
      channel_id: 2002,
      channel_name: "Zee Telugu",
      logoUrl: "/channels/zee-telugu.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 2,
      language: "Telugu",
      rating: 4.6,
      viewerCount: 98000,
      isLive: true,
      currentProgram: "Trinayani"
    },
    {
      channel_id: 2003,
      channel_name: "Star Maa",
      logoUrl: "/channels/star-maa.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 2,
      language: "Telugu",
      rating: 4.8,
      viewerCount: 115000,
      isLive: true,
      currentProgram: "Bigg Boss Telugu"
    },
    {
      channel_id: 2004,
      channel_name: "ETV Telugu",
      logoUrl: "/channels/etv-telugu.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 2,
      language: "Telugu",
      rating: 4.5,
      viewerCount: 87000,
      isLive: true,
      currentProgram: "Jabardasth"
    },
  ],
  hindi: [
    {
      channel_id: 3001,
      channel_name: "Star Plus",
      logoUrl: "/channels/star-plus.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 3,
      language: "Hindi",
      rating: 4.9,
      viewerCount: 250000,
      isLive: true,
      currentProgram: "Anupamaa"
    },
    {
      channel_id: 3002,
      channel_name: "Colors",
      logoUrl: "/channels/colors.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 3,
      language: "Hindi",
      rating: 4.8,
      viewerCount: 230000,
      isLive: true,
      currentProgram: "Bigg Boss"
    },
    {
      channel_id: 3003,
      channel_name: "Sony TV",
      logoUrl: "/channels/sony-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 3,
      language: "Hindi",
      rating: 4.7,
      viewerCount: 215000,
      isLive: true,
      currentProgram: "Kaun Banega Crorepati"
    },
    {
      channel_id: 3004,
      channel_name: "Zee TV",
      logoUrl: "/channels/zee-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 3,
      language: "Hindi",
      rating: 4.6,
      viewerCount: 195000,
      isLive: true,
      currentProgram: "Kundali Bhagya"
    },
    {
      channel_id: 3005,
      channel_name: "Star Bharat",
      logoUrl: "/channels/star-bharat.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 3,
      language: "Hindi",
      rating: 4.4,
      viewerCount: 175000,
      isLive: true,
      currentProgram: "Woh Toh Hai Albelaa"
    },
  ],
  malayalam: [
    {
      channel_id: 4001,
      channel_name: "Asianet",
      logoUrl: "/channels/asianet.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 4,
      language: "Malayalam",
      rating: 4.8,
      viewerCount: 92000,
      isLive: true,
      currentProgram: "Santhwanam"
    },
    {
      channel_id: 4002,
      channel_name: "Mazhavil Manorama",
      logoUrl: "/channels/mazhavil.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 4,
      language: "Malayalam",
      rating: 4.7,
      viewerCount: 88000,
      isLive: true,
      currentProgram: "Bhramanam"
    },
    {
      channel_id: 4003,
      channel_name: "Surya TV",
      logoUrl: "/channels/surya-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 4,
      language: "Malayalam",
      rating: 4.6,
      viewerCount: 82000,
      isLive: true,
      currentProgram: "Kasthooriman"
    },
    {
      channel_id: 4004,
      channel_name: "Flowers TV",
      logoUrl: "/channels/flowers-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: false,
      is_premium: false,
      channelLanguageId: 4,
      language: "Malayalam",
      rating: 4.5,
      viewerCount: 75000,
      isLive: true,
      currentProgram: "Comedy Utsavam"
    },
  ],
  kannada: [
    {
      channel_id: 5001,
      channel_name: "Colors Kannada",
      logoUrl: "/channels/colors-kannada.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 5,
      language: "Kannada",
      rating: 4.7,
      viewerCount: 85000,
      isLive: true,
      currentProgram: "Bigg Boss Kannada"
    },
    {
      channel_id: 5002,
      channel_name: "Zee Kannada",
      logoUrl: "/channels/zee-kannada.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 5,
      language: "Kannada",
      rating: 4.6,
      viewerCount: 78000,
      isLive: true,
      currentProgram: "Gattimela"
    },
    {
      channel_id: 5003,
      channel_name: "Udaya TV",
      logoUrl: "/channels/udaya-tv.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 5,
      language: "Kannada",
      rating: 4.5,
      viewerCount: 72000,
      isLive: true,
      currentProgram: "Paaru"
    },
    {
      channel_id: 5004,
      channel_name: "Star Suvarna",
      logoUrl: "/channels/star-suvarna.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 5,
      language: "Kannada",
      rating: 4.4,
      viewerCount: 68000,
      isLive: true,
      currentProgram: "Jothe Jotheyali"
    },
  ],
  english: [
    {
      channel_id: 6001,
      channel_name: "Star World",
      logoUrl: "/channels/star-world.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 6,
      language: "English",
      rating: 4.6,
      viewerCount: 95000,
      isLive: true,
      currentProgram: "Friends"
    },
    {
      channel_id: 6002,
      channel_name: "Comedy Central",
      logoUrl: "/channels/comedy-central.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 6,
      language: "English",
      rating: 4.5,
      viewerCount: 87000,
      isLive: true,
      currentProgram: "The Office"
    },
    {
      channel_id: 6003,
      channel_name: "HBO",
      logoUrl: "/channels/hbo.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: true,
      channelLanguageId: 6,
      language: "English",
      rating: 4.9,
      viewerCount: 125000,
      isLive: true,
      currentProgram: "Game of Thrones"
    },
    {
      channel_id: 6004,
      channel_name: "BBC Entertainment",
      logoUrl: "/channels/bbc.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 6,
      language: "English",
      rating: 4.7,
      viewerCount: 102000,
      isLive: true,
      currentProgram: "Doctor Who"
    },
    {
      channel_id: 6005,
      channel_name: "AXN",
      logoUrl: "/channels/axn.png",
      channelCategory: "Entertainment",
      channelCategoryId: 8,
      isHD: true,
      is_premium: false,
      channelLanguageId: 6,
      language: "English",
      rating: 4.6,
      viewerCount: 98000,
      isLive: true,
      currentProgram: "The Walking Dead"
    },
  ],
};

/**
 * Fetch all available languages with metadata
 */
export async function fetchLanguageMetadata(): Promise<LanguageMetadata[]> {
  try {
    // In production, this would fetch from actual API
    // For now, returning mock data
    return new Promise((resolve) => {
      setTimeout(() => resolve(LANGUAGE_METADATA), 100);
    });
  } catch (error) {
    console.error("Error fetching language metadata:", error);
    return [];
  }
}

/**
 * Fetch channels for a specific language
 */
export async function fetchChannelsByLanguage(
  language: string
): Promise<LiveTVChannel[]> {
  try {
    const languageKey = language.toLowerCase();

    // In production, this would fetch from actual API
    // For now, returning mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const channels = MOCK_CHANNELS[languageKey] || [];
        resolve(channels);
      }, 200);
    });
  } catch (error) {
    console.error(`Error fetching channels for ${language}:`, error);
    return [];
  }
}

/**
 * Fetch all channels grouped by language
 */
export async function fetchAllChannelsByLanguages(): Promise<ChannelsByLanguage[]> {
  try {
    const languages = await fetchLanguageMetadata();
    const results: ChannelsByLanguage[] = [];

    for (const lang of languages) {
      const channels = await fetchChannelsByLanguage(lang.slug);
      results.push({
        language: lang.name,
        channels,
      });
    }

    return results;
  } catch (error) {
    console.error("Error fetching all channels by languages:", error);
    return [];
  }
}

/**
 * Search channels across all languages
 */
export async function searchChannels(
  query: string
): Promise<LiveTVChannel[]> {
  if (!query.trim()) return [];

  try {
    // In production, use actual API
    const allChannels = Object.values(MOCK_CHANNELS).flat();
    const results = allChannels.filter((channel) =>
      channel.channel_name.toLowerCase().includes(query.toLowerCase())
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(results), 150);
    });
  } catch (error) {
    console.error("Error searching channels:", error);
    return [];
  }
}

/**
 * Get channel details by ID
 */
export async function getChannelDetails(
  channelId: number
): Promise<LiveTVChannel | null> {
  try {
    const allChannels = Object.values(MOCK_CHANNELS).flat();
    const channel = allChannels.find((ch) => ch.channel_id === channelId);

    return new Promise((resolve) => {
      setTimeout(() => resolve(channel || null), 100);
    });
  } catch (error) {
    console.error("Error fetching channel details:", error);
    return null;
  }
}

/**
 * Get trending/popular channels
 */
export async function getTrendingChannels(
  limit: number = 10
): Promise<LiveTVChannel[]> {
  try {
    const allChannels = Object.values(MOCK_CHANNELS).flat();
    const sorted = allChannels.sort(
      (a, b) => (b.viewerCount || 0) - (a.viewerCount || 0)
    );

    return new Promise((resolve) => {
      setTimeout(() => resolve(sorted.slice(0, limit)), 100);
    });
  } catch (error) {
    console.error("Error fetching trending channels:", error);
    return [];
  }
}
