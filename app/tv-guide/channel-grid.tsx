"use client";

import { JioChannel } from "@/lib/fetcher/jio-apis";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tv, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChannelGridProps {
	channels: JioChannel[];
}

export function ChannelGrid({ channels }: ChannelGridProps) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{channels.map((channel) => (
				<ChannelCard key={channel.channel_id} channel={channel} />
			))}
		</div>
	);
}

interface ChannelCardProps {
	channel: JioChannel;
}

function ChannelCard({ channel }: ChannelCardProps) {
	const handleViewDetails = () => {
		// TODO: Navigate to channel details page or open modal with EPG
	};

	return (
		<Card className="group relative overflow-hidden hover:shadow-lg transition-all">
			<div className="p-4 space-y-3">
				{/* Channel Logo/Icon */}
				<div className="relative aspect-video rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
					{channel.logoUrl ? (
						<img
							src={`https://jiotv.catchup.cdn.jio.com/dare_images/images/${channel.logoUrl}`}
							alt={channel.channel_name}
							className="object-contain w-full h-full p-4"
							onError={(e) => {
								e.currentTarget.style.display = "none";
								e.currentTarget.nextElementSibling?.classList.remove("hidden");
							}}
						/>
					) : null}
					<div className={channel.logoUrl ? "hidden" : ""}>
						<Tv className="size-12 text-white" />
					</div>

					{/* HD Badge */}
					{channel.isHD && (
						<Badge className="absolute top-2 left-2 bg-blue-600 text-white border-0">HD</Badge>
					)}

					{/* Premium Badge */}
					{channel.is_premium && (
						<Badge className="absolute top-2 right-2 bg-yellow-600 text-white border-0">
							<Star className="size-3 mr-1" />
							Premium
						</Badge>
					)}

					{/* Hover Overlay */}
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
						<Button
							size="icon"
							className="size-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={handleViewDetails}
						>
							<Play className="size-6 fill-current" />
						</Button>
					</div>
				</div>

				{/* Channel Info */}
				<div className="space-y-2">
					<div>
						<h3 className="font-semibold text-sm line-clamp-1">{channel.channel_name}</h3>
						<p className="text-xs text-muted-foreground">{channel.channelCategory}</p>
					</div>

					{/* Channel Details */}
					<div className="flex items-center gap-2 flex-wrap">
						<Badge variant="secondary" className="text-xs">
							Ch {channel.stbChannelNumber}
						</Badge>

						{channel.business_type === "free" && (
							<Badge variant="outline" className="text-xs">
								Free
							</Badge>
						)}

						{channel.isCatchupAvailable && (
							<Badge variant="outline" className="text-xs">
								Catchup
							</Badge>
						)}
					</div>

					{/* Price for Premium Channels */}
					{channel.is_premium && channel.channelPrice && (
						<p className="text-xs text-muted-foreground">{channel.channelPrice}</p>
					)}
				</div>
			</div>
		</Card>
	);
}
