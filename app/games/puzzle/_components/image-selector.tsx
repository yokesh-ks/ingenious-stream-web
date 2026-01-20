"use client";

import Image from "next/image";

// Sample puzzle images - Movie posters
const puzzleImages = [
	{
		id: 1,
		url: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
		title: "Avengers: Endgame",
	},
	{
		id: 2,
		url: "https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
		title: "The Lion King",
	},
	{
		id: 3,
		url: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
		title: "Spider-Man",
	},
	{
		id: 4,
		url: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
		title: "Dune",
	},
	{
		id: 5,
		url: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
		title: "Interstellar",
	},
	{
		id: 6,
		url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
		title: "The Dark Knight",
	},
	{
		id: 7,
		url: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
		title: "Forrest Gump",
	},
	{
		id: 8,
		url: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
		title: "The Matrix",
	},
];

interface ImageSelectorProps {
	onSelect: (url: string, title: string) => void;
}

export function ImageSelector({ onSelect }: ImageSelectorProps) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
			{puzzleImages.map((image) => (
				<button
					key={image.id}
					onClick={() => onSelect(image.url, image.title)}
					className="group relative aspect-[2/3] rounded-xl overflow-hidden border-4 border-transparent hover:border-purple-500/50 hover:scale-[1.02] transition-all duration-300"
				>
					<Image src={image.url} alt={image.title} fill className="object-cover" unoptimized />

					{/* Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<div className="absolute bottom-0 left-0 right-0 p-3">
							<p className="text-white font-medium text-sm truncate">{image.title}</p>
						</div>
					</div>
				</button>
			))}
		</div>
	);
}
