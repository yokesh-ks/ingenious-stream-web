"use client";

import { useState } from "react";
import { Search, Tv } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Channel } from "../../actions";

interface ChannelGridProps {
	channels: Channel[];
	languageColor: string;
}

export default function ChannelGrid({ channels, languageColor }: ChannelGridProps) {
	const params = useParams();
	const slug = params.slug as string;
	const [searchQuery, setSearchQuery] = useState("");

	const filteredChannels = channels.filter((channel) =>
		channel.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<>
			{/* Search Bar */}
			<div className="relative max-w-md">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
				<Input
					placeholder="Search channels..."
					className="pl-9 bg-muted/50 border-0"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			{/* Channels Grid */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
				{filteredChannels.map((channel) => (
					<Link
						key={channel.id}
						href={`/live-tv/${slug}/${channel.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative bg-gradient-to-br from-card to-muted/30 rounded-xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/50 hover:-translate-y-1 overflow-hidden"
					>
						{/* Background Decoration */}
						<div
							className={cn(
								"absolute -right-4 -top-4 size-20 rounded-full opacity-5",
								languageColor,
							)}
						/>

						{/* Channel Logo */}
						<div className="relative aspect-video rounded-lg bg-muted/50 mb-3 flex items-center justify-center overflow-hidden">
							{channel.logo ? (
								<Image
									src={channel.logo}
									alt={channel.name}
									fill
									className="object-contain p-2"
									unoptimized
								/>
							) : (
								<Tv className="size-12 text-muted-foreground/50" />
							)}

							{/* Play Button Overlay */}
							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
								<div className="size-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg overflow-hidden">
									<Image
										src="/icon.png"
										alt="Play"
										width={48}
										height={48}
										className="object-cover"
									/>
								</div>
							</div>
						</div>

						{/* Channel Name */}
						<h3 className="font-semibold text-sm text-center line-clamp-2 min-h-[2.5rem]">
							{channel.name}
						</h3>
					</Link>
				))}
			</div>

			{/* No Results */}
			{filteredChannels.length === 0 && (
				<div className="text-center py-20">
					<p className="text-muted-foreground">No channels found matching "{searchQuery}"</p>
				</div>
			)}
		</>
	);
}
