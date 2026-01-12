"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface Genre {
	id: number;
	name: string;
}

interface Provider {
	provider_id: number;
	provider_name: string;
	logo_path: string;
}

interface DiscoverFiltersProps {
	type: "movie" | "tv";
	genres: Genre[];
	providers: Provider[];
}

export function DiscoverFilters({ type, genres }: DiscoverFiltersProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentParams = Object.fromEntries(searchParams.entries());

	const minRating = currentParams["vote_average.gte"] || "";
	const maxRating = currentParams["vote_average.lte"] || "";
	const year = currentParams.primary_release_year || currentParams.year || "";

	const updateFilters = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		params.delete("page"); // Reset to first page when filters change
		router.push(`${pathname}?${params.toString()}`);
	};

	const clearFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		["vote_average.gte", "vote_average.lte", "primary_release_year", "year"].forEach((key) => {
			params.delete(key);
		});
		params.delete("page");
		router.push(`${pathname}?${params.toString()}`);
	};

	const hasActiveFilters = minRating || maxRating || year;

	return (
		<div className="flex items-center gap-2 flex-wrap">
			{/* Rating Range */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Min Rating:</span>
				<Input
					type="number"
					placeholder="0"
					min="0"
					max="10"
					step="0.1"
					value={minRating}
					onChange={(e) => updateFilters("vote_average.gte", e.target.value)}
					className="w-16 h-8"
				/>
			</div>

			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Max Rating:</span>
				<Input
					type="number"
					placeholder="10"
					min="0"
					max="10"
					step="0.1"
					value={maxRating}
					onChange={(e) => updateFilters("vote_average.lte", e.target.value)}
					className="w-16 h-8"
				/>
			</div>

			{/* Year */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Year:</span>
				<Input
					type="number"
					placeholder="2023"
					min="1900"
					max={new Date().getFullYear()}
					value={year}
					onChange={(e) =>
						updateFilters(type === "movie" ? "primary_release_year" : "year", e.target.value)
					}
					className="w-20 h-8"
				/>
			</div>

			{/* Clear Filters */}
			{hasActiveFilters && (
				<Button variant="ghost" size="sm" onClick={clearFilters}>
					<X className="h-4 w-4 mr-1" />
					Clear
				</Button>
			)}
		</div>
	);
}
