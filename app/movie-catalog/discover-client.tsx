"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { tmdb } from "@/lib/tmdb/api";
import { SortByType } from "@/lib/tmdb/api/types";
import type { Movie } from "@/lib/tmdb/models/movie";

import { filterDiscoverParams } from "@/lib/utils";
import { ListPagination } from "@/components/list-pagination";
import { MovieCard } from "@/components/movie-card";

export default function DiscoverClient() {
	const searchParams = useSearchParams();
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMovies() {
			setLoading(true);
			const region = "IN"; // Default region India
			const params = Object.fromEntries(searchParams.entries());

			// Parse page parameter to number, default to 1
			const pageNumber = params?.page ? parseInt(params.page, 10) : 1;

			try {
				const { results, page, total_pages } = await tmdb.discover.movie({
					watch_region: region,
					page: pageNumber.toString(),
					sort_by: params?.sort_by as SortByType,
					...filterDiscoverParams(params),
				});

				setMovies(results);
				setCurrentPage(page);
				setTotalPages(total_pages);
			} catch (error) {
				console.error("Error fetching movies:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchMovies();
	}, [searchParams]);

	if (loading) {
		return (
			<div className="container flex justify-center pb-[30dvh]">
				<div className="text-center">
					<h1 className="text-2xl">Loading movies...</h1>
				</div>
			</div>
		);
	}

	return (
		<div>
			{movies.length ? (
				<div className="grid-list">
					{movies.map((movie) => (
						<MovieCard key={movie.id} {...movie} />
					))}
				</div>
			) : (
				<div className="container flex justify-center pb-[30dvh]">
					<div className="text-center">
						<h1 className="text-2xl">No movies found for the selected filters.</h1>
						<p className="text-muted-foreground">
							Try removing some of the filters to get more results.
						</p>
					</div>
				</div>
			)}

			{movies?.length > 0 && <ListPagination currentPage={currentPage} totalPages={totalPages} />}
		</div>
	);
}
