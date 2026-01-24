"use client";

import Image from "next/image";
import { puzzleImages } from "../_constants/movie-posters";

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
