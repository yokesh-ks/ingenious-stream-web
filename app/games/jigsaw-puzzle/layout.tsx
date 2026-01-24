import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Jigsaw Puzzle - Games - Ingenious Stream",
	description: "Solve beautiful jigsaw puzzles from movie posters and celebrity photos",
};

export default function PuzzleLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
