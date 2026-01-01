import { redirect } from "next/navigation";
import { getChannelsByLanguage, getLanguages } from "../../actions";
import { getChannelDetails } from "./actions";

interface PageProps {
	params: Promise<{
		slug: string;
		channel: string;
	}>;
}

export async function generateStaticParams() {
	const languages = await getLanguages();
	const allChannels: { slug: string; channel: string }[] = [];

	for (const language of languages) {
		const channels = await getChannelsByLanguage(language.slug);
		for (const channel of channels) {
			allChannels.push({
				slug: language.slug,
				channel: channel.id,
			});
		}
	}

	return allChannels;
}

export default async function ChannelPage({ params }: PageProps) {
	const { channel } = await params;

	const channelDetails = await getChannelDetails(channel);

	if (!channelDetails || !channelDetails.streamUrl) {
		redirect("/live-tv");
	}

	redirect(channelDetails.streamUrl);
}
