import { notFound } from "next/navigation";
import { ArrowLeft, Tv } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getChannelsByLanguage, getLanguages } from "../actions";
import ChannelGrid from "./components/ChannelGrid";

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	const languages = await getLanguages();
	return languages.map((language) => ({
		slug: language.slug,
	}));
}

const languageColors: Record<string, string> = {
	tamil: "bg-orange-500",
	telugu: "bg-blue-500",
	kannada: "bg-purple-500",
	malayalam: "bg-green-500",
	assamese: "bg-pink-500",
	bengali: "bg-yellow-500",
	bhojpuri: "bg-red-500",
	english: "bg-indigo-500",
	gujarati: "bg-teal-500",
	hindi: "bg-rose-500",
	marathi: "bg-cyan-500",
	odia: "bg-amber-500",
	punjabi: "bg-lime-500",
	urdu: "bg-violet-500",
};

export default async function LanguageChannelsPage({ params }: PageProps) {
	const { slug } = await params;

	const [channels, languages] = await Promise.all([getChannelsByLanguage(slug), getLanguages()]);

	const currentLanguage = languages.find((lang) => lang.slug === slug);

	if (!currentLanguage) {
		notFound();
	}

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Link href="/live-tv">
					<Button variant="ghost" size="icon" className="rounded-full">
						<ArrowLeft className="size-5" />
					</Button>
				</Link>
				<div className="flex items-center gap-4 flex-1">
					<div className="relative size-16">
						<div
							className={`absolute inset-0 rounded-full opacity-20 blur-sm ${
								languageColors[slug] || "bg-gray-500"
							}`}
						/>
						<div
							className={`relative size-16 rounded-full flex items-center justify-center shadow-lg ${
								languageColors[slug] || "bg-gray-500"
							}`}
						>
							<span className="text-xl font-black text-white tracking-tighter">
								{currentLanguage.name.substring(0, 2).toUpperCase()}
							</span>
						</div>
					</div>
					<div>
						<h1 className="text-3xl font-bold">{currentLanguage.name}</h1>
						<p className="text-muted-foreground">
							{channels.length} {channels.length === 1 ? "channel" : "channels"} available
						</p>
					</div>
				</div>
			</div>

			{/* Channels Grid */}
			{channels.length > 0 ? (
				<ChannelGrid channels={channels} languageColor={languageColors[slug] || "bg-gray-500"} />
			) : (
				<div className="flex flex-col items-center justify-center py-20">
					<Tv className="size-16 text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold mb-2">No channels available</h3>
					<p className="text-muted-foreground">
						There are no channels available for {currentLanguage.name} at the moment.
					</p>
				</div>
			)}
		</div>
	);
}
