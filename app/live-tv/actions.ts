import {
  fetchLanguageMetadata,
  fetchChannelsByLanguage,
  type Language,
  type Channel,
} from "@/lib/fetcher/live-tv-apis";

export type { Language, Channel };

export async function getLanguages(): Promise<Language[]> {
  return fetchLanguageMetadata();
}

export async function getChannelsByLanguage(slug: string): Promise<Channel[]> {
  return fetchChannelsByLanguage(slug);
}
