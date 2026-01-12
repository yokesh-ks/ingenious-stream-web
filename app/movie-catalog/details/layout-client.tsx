"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/tmdb/api";
import { WithVideos } from "@/lib/tmdb/api/types";
import { format } from "@/lib/tmdb/utils";

import { Tabs, TabsLink, TabsList } from "@/components/ui/tabs";
import { MediaBackdrop } from "@/components/media-backdrop";
import { MediaDetailView } from "@/components/media-detail-view";
import { MediaPoster } from "@/components/media-poster";
import { MediaRating } from "@/components/media-rating";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { ScrollFixer } from "@/components/scroll-fixer";
import { Skeleton } from "@/components/ui/skeleton";

interface DetailLayoutProps {
	children: React.ReactNode;
}

export default function DetailLayoutClient({ children }: DetailLayoutProps) {
	const searchParams = useSearchParams();
	const id = searchParams.get("id") as string;

	const {
		data: movie,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["movie-detail", id],
		queryFn: () => tmdb.movie.detail<WithVideos>({ id, append: "videos" }),
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<MediaDetailView.Root>
				<ScrollFixer />
				<MediaDetailView.Backdrop>
					<Skeleton className="size-full rounded-md" />
				</MediaDetailView.Backdrop>
				<MediaDetailView.Hero>
					<MediaDetailView.Poster>
						<Skeleton className="size-full rounded-md" />
					</MediaDetailView.Poster>
					<div className="space-y-4">
						<Skeleton className="h-6 w-40 rounded-md" />
						<Skeleton className="h-8 w-60 rounded-md" />
						<Skeleton className="h-4 w-full rounded-md" />
						<Skeleton className="h-4 w-full rounded-md" />
						<Skeleton className="h-4 w-32 rounded-md" />
					</div>
				</MediaDetailView.Hero>
				<MediaDetailView.Content>
					<Skeleton className="mt-4 h-[30vh] w-full rounded-md" />
				</MediaDetailView.Content>
			</MediaDetailView.Root>
		);
	}

	if (error || !movie?.id || movie.adult) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-2">Movie not found</h1>
					<p className="text-muted-foreground">The requested movie could not be found.</p>
				</div>
			</div>
		);
	}

	const {
		title,
		overview,
		genres,
		vote_average,
		vote_count,
		backdrop_path,
		poster_path,
		tagline,
		videos,
	} = movie;

	return (
		<MediaDetailView.Root>
			<ScrollFixer />

			<MediaDetailView.Backdrop>
				<MediaBackdrop image={backdrop_path} alt={title} />
			</MediaDetailView.Backdrop>

			<MediaDetailView.Hero>
				<MediaDetailView.Poster>
					<MediaPoster image={poster_path} alt={title} size="w780" />
				</MediaDetailView.Poster>

				<div className="space-y-4">
					<MediaDetailView.Genres>
						<MediaRating average={vote_average} count={vote_count} />

						{genres?.map((genre: any) => (
							<Link key={genre.id} href={`/movie/discover?with_genres=${genre.id}`}>
								<MediaDetailView.Genre key={genre.id}>{genre.name}</MediaDetailView.Genre>
							</Link>
						))}
					</MediaDetailView.Genres>

					<MediaDetailView.Title>{title}</MediaDetailView.Title>

					{tagline && <MediaDetailView.Overview>"{tagline}"</MediaDetailView.Overview>}

					<MediaDetailView.Overview
						dangerouslySetInnerHTML={{ __html: format.content(overview) }}
					/>

					<MediaTrailerDialog videos={videos?.results} />
				</div>
			</MediaDetailView.Hero>

			<MediaDetailView.Content>
				<Tabs className="mt-12 w-full">
					<div className="max-w-screen scrollbar-hidden -mx-8 overflow-x-scroll px-8 lg:m-0 lg:p-0">
						<TabsList>
							<TabsLink href={`/movie-catalog/details?id=${id}`}>Overview</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=credits`}>Credits</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=watch`}>Watch</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=reviews`}>Reviews</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=images`}>Images</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=videos`}>Videos</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=recommendations`}>
								Recommendations
							</TabsLink>
							<TabsLink href={`/movie-catalog/details?id=${id}&tab=similar`}>Similar</TabsLink>
						</TabsList>
					</div>
				</Tabs>

				<div className="mt-4">{children}</div>
			</MediaDetailView.Content>
		</MediaDetailView.Root>
	);
}
