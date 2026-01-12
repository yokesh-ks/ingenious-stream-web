"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DiscoverSortProps {
	type: "movie" | "tv";
}

const sortOptions = [
	{ value: "popularity.desc", label: "Most Popular" },
	{ value: "popularity.asc", label: "Least Popular" },
	{ value: "vote_average.desc", label: "Highest Rated" },
	{ value: "vote_average.asc", label: "Lowest Rated" },
	{ value: "vote_count.desc", label: "Most Voted" },
	{ value: "vote_count.asc", label: "Least Voted" },
];

const movieSortOptions = [
	...sortOptions,
	{ value: "primary_release_date.desc", label: "Newest Releases" },
	{ value: "primary_release_date.asc", label: "Oldest Releases" },
	{ value: "revenue.desc", label: "Highest Revenue" },
	{ value: "revenue.asc", label: "Lowest Revenue" },
	{ value: "original_title.asc", label: "Title (A-Z)" },
	{ value: "original_title.desc", label: "Title (Z-A)" },
];

export function DiscoverSort({ type }: DiscoverSortProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const currentSort = searchParams.get("sort_by") || "popularity.desc";

	const handleSortChange = (value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sort_by", value);
		params.delete("page"); // Reset to first page when sorting changes
		router.push(`${pathname}?${params.toString()}`);
	};

	const options = type === "movie" ? movieSortOptions : sortOptions;
	const currentOption = options.find((opt) => opt.value === currentSort);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between">
					{currentOption?.label || "Sort by"}
					<ChevronDown className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				{options.map((option) => (
					<DropdownMenuItem
						key={option.value}
						onClick={() => handleSortChange(option.value)}
						className={currentSort === option.value ? "bg-accent" : ""}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
