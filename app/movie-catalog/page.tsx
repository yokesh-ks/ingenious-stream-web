import { pages } from "@/config";
import { tmdb } from "@/lib/tmdb/api";
import { SortByType } from "@/lib/tmdb/api/types";

import { filterDiscoverParams } from "@/lib/utils";
import { ListPagination } from "@/components/list-pagination";
import { MovieCard } from "@/components/movie-card";

interface ListPageProps {
	searchParams?: Record<string, string>;
}

export async function generateMetadata() {
	return {
		title: "Discover Movies",
		description: pages.movie.discover.description,
	};
}

export default async function Discover({ searchParams }: ListPageProps) {
	const region = "IN"; // Default region India
	const params = searchParams;

	// Parse page parameter to number, default to 1
	const pageNumber = params?.page ? parseInt(params.page, 10) : 1;

	const {
		results: movies,
		page: currentPage,
		total_pages: totalPages,
	} = await tmdb.discover.movie({
		watch_region: region,
		page: pageNumber.toString(),
		sort_by: params?.sort_by as SortByType,
		...filterDiscoverParams(params),
	});

	const { results: providers } = await tmdb.watchProviders.movie({
		region,
	});

	const { genres } = await tmdb.genres.movie();

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
