"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb/api";
import { format } from "@/lib/tmdb/utils";

import { formatValue, joiner } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailClient() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id") as string;

	const {
		data: movie,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie-detail-overview", id],
		queryFn: () => tmdb.movie.detail({ id }),
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<section className="space-y-4">
				<Table>
					<TableBody>
						{Array.from({ length: 10 }).map((_, index) => (
							<TableRow key={index}>
								<TableHead className="w-1/5">
									<Skeleton className="h-4 w-24" />
								</TableHead>
								<TableCell colSpan={2}>
									<Skeleton className="h-4 w-48" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		);
	}

	if (error || !movie) {
		return (
			<section className="space-y-4">
				<div className="text-center py-8">
					<p className="text-muted-foreground">Failed to load movie details.</p>
				</div>
			</section>
		);
	}

	const {
		status,
		release_date,
		runtime,
		budget,
		revenue,
		spoken_languages,
		production_companies,
		belongs_to_collection,
		original_title,
		original_language,
		production_countries,
	} = movie;

	const overview = [
		{
			title: "Release Date",
			value: formatValue(release_date, format.date),
		},
		{
			title: "Status",
			value: formatValue(status),
		},
		{
			title: "Original Title",
			value: formatValue(original_title),
		},
		{
			title: "Runtime",
			value: formatValue(runtime, format.runtime),
		},
		{
			title: "Budget",
			value: formatValue(budget, format.currency),
		},
		{
			title: "Revenue",
			value: formatValue(revenue, format.currency),
		},
		{
			title: "Language",
			value: joiner(spoken_languages, "english_name"),
		},
		{
			title: "Original Language",
			value: formatValue(original_language, format.country),
		},
		{
			title: "Production Countries",
			value: joiner(production_countries, "name"),
		},
		{
			title: "Production Companies",
			value: production_companies.map(({ id, name }: any) => (
				<Link
					key={id}
					href={`/movie/discover?with_companies=${id}`}
					className="mr-1 border-b-2 transition hover:text-foreground"
				>
					{name}
				</Link>
			)),
		},
	];

	return (
		<section className="space-y-4">
			<Table>
				<TableBody>
					{overview.map((item) => (
						<TableRow key={item.title}>
							<TableHead className="w-1/5">{item.title}</TableHead>
							<TableCell colSpan={2}>{item.value}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	);
}
