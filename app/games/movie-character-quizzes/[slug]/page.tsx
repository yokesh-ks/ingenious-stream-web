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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-2xl font-bold text-white">Quiz Not Found</h1>
          <p className="text-gray-400">The quiz you're looking for doesn't exist.</p>
          <Link
            href="/games/movie-character-quizzes"
            className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Quizzes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div>
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-8">
          <QuizStartPageClient
            quizData={quizData}
            computerOpponents={computerOpponents}
          />
        </main>
      </div>
    </div>
  );
}
