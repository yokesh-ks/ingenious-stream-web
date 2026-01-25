import Link from "next/link";
import { getQuizData, computerOpponents, QuizData } from "./_constants/quiz-data";
import QuizStartPageClient from "./page-client";

interface QuizStartPageProps {
	params: {
		slug: string;
	};
}

export default async function QuizDetailPage({ params }: QuizStartPageProps) {
	const { slug } = await params;

	const quizData = getQuizData(slug);

	if (!quizData) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="relative text-center">
					{/* Spotlight effect */}
					<div className="absolute -inset-20 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

					<div className="relative space-y-6">
						{/* Film reel icon */}
						<div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-zinc-900 border border-amber-500/30 shadow-lg">
							<span className="text-5xl">🎬</span>
						</div>

						<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
							Scene Not Found
						</h1>
						<p className="text-zinc-400 max-w-sm mx-auto">
							This quiz seems to have left the theatre. Let&apos;s find you another showtime.
						</p>

						<Link
							href="/games/movie-character-quizzes"
							className="inline-flex items-center gap-2 mt-4 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-900 font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/20"
						>
							Browse All Quizzes
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full">
			{/* Main Content */}
			<main className="max-w-6xl mx-auto px-6 py-8">
				<QuizStartPageClient quizData={quizData} computerOpponents={computerOpponents} />
			</main>
		</div>
	);
}
