"use client";

import React from "react";
import { Play, Pause, Heart, Radio as RadioIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerContext";
import { RadioStation } from "@/lib/fetcher/browser-radio-api";
import { cn } from "@/lib/utils";

interface StationCardProps {
	station: RadioStation;
	size?: "default" | "large" | "small";
}

export function StationCard({ station, size = "default" }: StationCardProps) {
	const { playStation, currentStation, isPlaying, togglePlay, toggleFavorite, isFavorite } =
		usePlayer();

	const isCurrentStation = currentStation?.stationuuid === station.stationuuid;
	const isThisPlaying = isCurrentStation && isPlaying;

	const handlePlay = () => {
		if (isCurrentStation) {
			togglePlay();
		} else {
			playStation(station);
		}
	};

	const sizeClasses = {
		default: "p-4",
		large: "p-6",
		small: "p-3",
	};

	return (
		<div
			className={cn(
				"bg-card rounded-2xl border border-border group cursor-pointer",
				sizeClasses[size],
			)}
			onClick={handlePlay}
		>
			<div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-muted">
				{station.favicon ? (
					<img
						src={station.favicon}
						alt={station.name}
						className="w-full h-full object-cover"
						onError={(e) => {
							e.currentTarget.style.display = "none";
							const fallback = e.currentTarget.nextElementSibling as HTMLElement;
							if (fallback) fallback.style.display = "flex";
						}}
					/>
				) : null}
				<div
					className={cn(
						"absolute inset-0 items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/10 to-muted",
						station.favicon ? "hidden" : "flex",
					)}
				>
					<RadioIcon className="w-12 h-12 text-primary/60" />
				</div>

				{/* Play overlay */}
				<div
					className={cn(
						"absolute inset-0 bg-black/40 flex items-center justify-center",
						isThisPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100",
					)}
				>
					{isThisPlaying ? (
						<div className="flex gap-1 items-end h-8">
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className="w-1.5 bg-primary rounded-full"
									style={{
										height: "40%",
									}}
								/>
							))}
						</div>
					) : (
						<Button
							size="icon"
							className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
						>
							<Play className="w-6 h-6 ml-1" />
						</Button>
					)}
				</div>

				{/* Favorite button */}
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 opacity-0 group-hover:opacity-100"
					onClick={(e) => {
						e.stopPropagation();
						toggleFavorite(station);
					}}
				>
					<Heart
						className={cn(
							"w-4 h-4",
							isFavorite(station.stationuuid) ? "fill-primary text-primary" : "text-white",
						)}
					/>
				</Button>
			</div>

			<h3 className="font-semibold text-foreground truncate mb-1">{station.name}</h3>
			<p className="text-sm text-muted-foreground truncate">
				{station.country || "Unknown"} {station.tags && `• ${station.tags.split(",")[0]}`}
			</p>
			{station.bitrate > 0 && (
				<p className="text-xs text-muted-foreground/60 mt-1">{station.bitrate} kbps</p>
			)}
		</div>
	);
}
