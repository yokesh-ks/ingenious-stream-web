"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GenreCardProps {
	genre: string;
	image: string;
	index?: number;
}

export function GenreCard({ genre, image, index = 0 }: GenreCardProps) {
	return (
		<Link href={`/radio/genres/${encodeURIComponent(genre)}`}>
			<div className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer">
				<img src={image} alt={genre} className="w-full h-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
				<div className="absolute inset-0 flex items-center justify-center">
					<h3 className="text-white font-semibold text-lg capitalize">{genre}</h3>
				</div>
			</div>
		</Link>
	);
}
