"use client";

import React from "react";
import Link from "next/link";

interface LanguageCardProps {
	language: string;
	index?: number;
	stationCount?: number;
}

interface LanguageData {
	native: string;
	flag: [string, string, string];
	accent: string;
}

// Language data with native text and actual flag colors
const LANGUAGE_DATA: Record<string, LanguageData> = {
	english: { native: "Hello", flag: ["#002868", "#BF0A30", "#FFFFFF"], accent: "#BF0A30" },
	spanish: { native: "Hola", flag: ["#AA151B", "#F1BF00", "#AA151B"], accent: "#F1BF00" },
	german: { native: "Hallo", flag: ["#000000", "#DD0000", "#FFCE00"], accent: "#FFCE00" },
	french: { native: "Bonjour", flag: ["#002395", "#FFFFFF", "#ED2939"], accent: "#ED2939" },
	portuguese: { native: "Olá", flag: ["#006600", "#FFCC00", "#FF0000"], accent: "#FFCC00" },
	russian: { native: "Привет", flag: ["#FFFFFF", "#0039A6", "#D52B1E"], accent: "#D52B1E" },
	japanese: { native: "こんにちは", flag: ["#FFFFFF", "#BC002D", "#FFFFFF"], accent: "#BC002D" },
	hindi: { native: "नमस्ते", flag: ["#FF9933", "#FFFFFF", "#138808"], accent: "#FF9933" },
	arabic: { native: "مرحبا", flag: ["#007A3D", "#FFFFFF", "#CE1126"], accent: "#CE1126" },
	chinese: { native: "你好", flag: ["#DE2910", "#FFDE00", "#DE2910"], accent: "#FFDE00" },
	italian: { native: "Ciao", flag: ["#009246", "#FFFFFF", "#CE2B37"], accent: "#CE2B37" },
	dutch: { native: "Hallo", flag: ["#AE1C28", "#FFFFFF", "#21468B"], accent: "#AE1C28" },
	polish: { native: "Cześć", flag: ["#FFFFFF", "#DC143C", "#FFFFFF"], accent: "#DC143C" },
	turkish: { native: "Merhaba", flag: ["#E30A17", "#FFFFFF", "#E30A17"], accent: "#E30A17" },
	korean: { native: "안녕하세요", flag: ["#FFFFFF", "#0047A0", "#C60C30"], accent: "#0047A0" },
	swedish: { native: "Hej", flag: ["#006AA7", "#FECC00", "#006AA7"], accent: "#FECC00" },
	greek: { native: "Γεια σου", flag: ["#0D5EAF", "#FFFFFF", "#0D5EAF"], accent: "#0D5EAF" },
	czech: { native: "Ahoj", flag: ["#FFFFFF", "#D7141A", "#11457E"], accent: "#D7141A" },
	romanian: { native: "Salut", flag: ["#002B7F", "#FCD116", "#CE1126"], accent: "#FCD116" },
	hungarian: { native: "Szia", flag: ["#CE2939", "#FFFFFF", "#477050"], accent: "#CE2939" },
	indonesian: { native: "Halo", flag: ["#FF0000", "#FFFFFF", "#FF0000"], accent: "#FF0000" },
	vietnamese: { native: "Xin chào", flag: ["#DA251D", "#FFFF00", "#DA251D"], accent: "#FFFF00" },
	thai: { native: "สวัสดี", flag: ["#A51931", "#F4F5F8", "#2D2A4A"], accent: "#A51931" },
	ukrainian: { native: "Привіт", flag: ["#005BBB", "#FFD500", "#005BBB"], accent: "#FFD500" },
	persian: { native: "سلام", flag: ["#239F40", "#FFFFFF", "#DA0000"], accent: "#DA0000" },
	finnish: { native: "Hei", flag: ["#FFFFFF", "#003580", "#FFFFFF"], accent: "#003580" },
	norwegian: { native: "Hei", flag: ["#EF2B2D", "#FFFFFF", "#002868"], accent: "#EF2B2D" },
	danish: { native: "Hej", flag: ["#C8102E", "#FFFFFF", "#C8102E"], accent: "#C8102E" },
	serbian: { native: "Здраво", flag: ["#C8102E", "#0C4076", "#FFFFFF"], accent: "#C8102E" },
	croatian: { native: "Bok", flag: ["#FF0000", "#FFFFFF", "#171796"], accent: "#FF0000" },
};

// Generate colors for unknown languages based on name hash
const generateColors = (name: string): LanguageData => {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash % 360);
	return {
		native: name.charAt(0).toUpperCase() + name.slice(1),
		flag: [
			`hsl(${hue}, 70%, 40%)`,
			`hsl(${(hue + 40) % 360}, 60%, 50%)`,
			`hsl(${(hue + 80) % 360}, 70%, 45%)`,
		],
		accent: `hsl(${hue}, 70%, 50%)`,
	};
};

export function LanguageCard({ language, index = 0, stationCount }: LanguageCardProps) {
	const langKey = language.toLowerCase();
	const data = LANGUAGE_DATA[langKey] || generateColors(language);

	return (
		<Link href={`/radio/languages/${encodeURIComponent(language)}`}>
			<button className="relative group overflow-hidden rounded-2xl aspect-[4/3] w-full bg-card border border-border">
				{/* Gradient background */}
				<div
					className="absolute inset-0 opacity-20"
					style={{
						background: `linear-gradient(135deg, ${data.flag[0]} 0%, ${data.flag[1]} 50%, ${data.flag[2]} 100%)`,
					}}
				/>

				{/* Geometric pattern overlay */}
				<div className="absolute inset-0 opacity-10">
					<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
						<defs>
							<pattern
								id={`grid-${language}-${index}`}
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<circle cx="10" cy="10" r="1" fill={data.accent} />
							</pattern>
						</defs>
						<rect width="100" height="100" fill={`url(#grid-${language}-${index})`} />
					</svg>
				</div>

				{/* Floating accent orb */}
				<div
					className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30"
					style={{ backgroundColor: data.accent }}
				/>

				{/* Content */}
				<div className="absolute inset-0 flex flex-col items-center justify-center p-4">
					{/* Native greeting - large */}
					<span
						className="text-xl sm:text-2xl font-bold mb-1 opacity-40 truncate max-w-full px-2"
						style={{ color: data.accent }}
					>
						{data.native}
					</span>

					{/* Language name */}
					<h3 className="font-bold text-base sm:text-lg text-foreground capitalize">{language}</h3>

					{/* Station count */}
					{stationCount && (
						<span className="text-xs text-muted-foreground mt-1">
							{stationCount.toLocaleString()} stations
						</span>
					)}

					{/* Accent line */}
					<div className="h-0.5 mt-2 rounded-full w-8" style={{ backgroundColor: data.accent }} />
				</div>

				{/* Corner accent */}
				<div
					className="absolute bottom-0 left-0 w-12 h-12 opacity-20"
					style={{
						background: `linear-gradient(135deg, transparent 50%, ${data.accent} 50%)`,
					}}
				/>
			</button>
		</Link>
	);
}
