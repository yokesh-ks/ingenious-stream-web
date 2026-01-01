/**
 * Jio TV API Client
 * Server-side API calls to Jio TV endpoints
 */

const JIO_TV_SEARCH_API = "https://tv.media.jio.com/apis/v2.3/search/searchauto";
const JIO_TV_EPG_API = "https://jiotvapi.cdn.jio.com/apis/v1.3/getepg/get";

export interface JioChannel {
	channel_id: number;
	channel_name: string;
	logoUrl: string;
	channelCategory: string;
	channelCategoryId: number;
	channel_order: string;
	business_type: string;
	plan_type: string;
	isHD: boolean;
	is_premium: boolean;
	channelPrice: string;
	stbChannelNumber: string;
	broadcasterId: number;
	channelLanguageId: number;
	keywords: string[];
	isActive: boolean;
	isCatchupAvailable: boolean;
	isAdsEnabled: boolean;
	isMidRollAdsEnabled: boolean;
	isMulticastStream: boolean;
	isMulticastStreamOberoi: boolean;
	screenType: number;
	aspectRatio: string;
	devicetype: string[];
	os: string[];
	user_category: string[];
	isHidden: number;
	isNewPdp: number;
	PDPExtras: string[];
	ShowPDPExtra: boolean;
	enableMidRollAds: number;
	enable_preroll_companion_ads: boolean;
	enable_midroll_companion_ads: boolean;
	enableVideoInterstitial: boolean;
	PlayAlongEnabled: number;
	enablePlayAlong: number;
	playAlongUrl: string;
	playAlongIconUrl: string;
	concurrentEnabled: boolean;
	concurrencyCode: number;
	scorecardEnabled: boolean;
	stbCatchup: boolean;
	isFingerPrintMobile: boolean;
	isFast: number;
}

export interface JioSearchResponse {
	code: number;
	message: string;
	data: {
		channels: JioChannel[];
	};
}

export interface JioEPGProgram {
	showtime: string;
	endtime: string;
	episode_num: number;
	episode_title: string;
	episode_desc: string;
	showCategory: string;
	startEpoch: number;
	endEpoch: number;
	srno: number;
}

export interface JioEPGResponse {
	code: number;
	message: string;
	epg: JioEPGProgram[];
}

/**
 * Search channels by query
 */
export async function searchChannels(query: string): Promise<JioChannel[]> {
	if (!query.trim()) return [];

	try {
		const url = `${JIO_TV_SEARCH_API}?query=${encodeURIComponent(query)}`;
		console.log("Fetching channels from:", url);

		const response = await fetch(url, {
			headers: {
				"User-Agent": "TVGuide/1.0",
			},
			next: { revalidate: 0 }, // Don't cache search results
		});

		console.log("Response status:", response.status);
		console.log("Response headers:", Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			const errorText = await response.text();
			console.error("API Error Response:", errorText);
			console.error(`Failed to search channels: ${response.status} ${response.statusText}`);
			return [];
		}

		const data: JioSearchResponse = await response.json();
		console.log("API Response data:", data);
		return data.data?.channels || [];
	} catch (error) {
		console.error("Error searching channels:", error);
		return [];
	}
}

/**
 * Get EPG (Electronic Program Guide) for a specific channel
 */
export async function getChannelEPG(
	channelId: number,
	offset: number = 0,
): Promise<JioEPGProgram[]> {
	try {
		const response = await fetch(`${JIO_TV_EPG_API}?channel_id=${channelId}&offset=${offset}`, {
			headers: {
				"User-Agent": "TVGuide/1.0",
			},
			next: { revalidate: 1800 }, // Cache for 30 minutes
		});

		if (!response.ok) {
			throw new Error("Failed to fetch channel EPG");
		}

		const data: JioEPGResponse = await response.json();
		return data.epg || [];
	} catch (error) {
		console.error("Error fetching channel EPG:", error);
		return [];
	}
}
