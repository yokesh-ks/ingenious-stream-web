export const metadata = {
	title: "Movie Catalog",
	description: "Coming soon - A comprehensive catalog of movies and entertainment content.",
};

export default function MovieCatalogPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 py-6 lg:py-10">
			<div className="space-y-2">
				<h1 className="text-4xl font-bold tracking-tight">🎬 Movie Catalog</h1>
				<p className="text-xl text-muted-foreground">
					A comprehensive catalog of movies and entertainment content
				</p>
			</div>

			<div className="bg-muted/50 border rounded-lg p-8 max-w-md">
				<div className="text-6xl mb-4">🚧</div>
				<h2 className="text-2xl font-semibold mb-2">Coming Soon</h2>
				<p className="text-muted-foreground">
					We're working hard to bring you the most comprehensive movie catalog experience. Stay
					tuned for updates!
				</p>
			</div>

			<div className="text-sm text-muted-foreground">Expected launch: Q1 2025</div>
		</div>
	);
}
