import { Music } from "lucide-react";
import { GenreCard } from "@/components/radio/genre-card";
import { fetchAllGenres } from "./actions";
import { GENRE_IMAGES, DEFAULT_GENRE_IMAGE } from "./constants";

export default async function GenresPage() {
	const genres = await fetchAllGenres();

	return (
		<div className="min-h-screen">
			<section className="px-4 sm:px-8 pt-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center gap-3 mb-8">
						<Music className="w-6 h-6 text-primary" />
						<div>
							<h1 className="text-2xl font-bold">All Genres</h1>
							<p className="text-sm text-muted-foreground mt-1">
								Browse {genres.length} music genres
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{genres.map((genre, i) => (
							<GenreCard
								key={genre.name}
								genre={genre.name}
								image={GENRE_IMAGES[genre.name.toLowerCase()] || DEFAULT_GENRE_IMAGE}
								index={i}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
