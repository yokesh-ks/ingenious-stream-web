import { TrendingUp } from "lucide-react";
import { StationCard } from "@/components/radio/station-card";
import { RadioStation } from "@/lib/fetcher/browser-radio-api";

interface TrendingSectionProps {
	stations: RadioStation[];
}

export function TrendingSection({ stations }: TrendingSectionProps) {
	return (
		<section className="px-4 sm:px-8 mb-16">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<TrendingUp className="w-5 h-5 text-secondary" />
						<h2 className="font-semibold text-lg">Trending Now</h2>
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{stations.slice(0, 4).map((station) => (
						<StationCard key={station.stationuuid} station={station} />
					))}
				</div>
			</div>
		</section>
	);
}
