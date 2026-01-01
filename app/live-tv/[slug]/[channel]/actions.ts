import { fetchChannelDetails, type ChannelDetails } from "@/lib/fetcher/live-tv-apis";

export type { ChannelDetails };

export async function getChannelDetails(channelId: string): Promise<ChannelDetails | null> {
	return fetchChannelDetails(channelId);
}
