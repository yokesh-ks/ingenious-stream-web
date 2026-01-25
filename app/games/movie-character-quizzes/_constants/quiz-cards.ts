export interface QuizCard {
	id: string;
	title: string;
	description: string;
	bgColor: string;
	textColor: string;
}

export const quizCards: QuizCard[] = [
	{
		id: "film-characters-2022",
		title: "Film Characters 2022",
		description: "Test your knowledge of memorable movie characters from 2022 releases",
		bgColor: "bg-red-100",
		textColor: "text-red-600",
	},
	{
		id: "film-characters-2023",
		title: "Film Characters 2023",
		description: "Challenge yourself with characters from the biggest 2023 movie releases",
		bgColor: "bg-blue-100",
		textColor: "text-blue-600",
	},
	{
		id: "film-characters-2024",
		title: "Film Characters 2024",
		description: "Discover characters from the latest and greatest 2024 film releases",
		bgColor: "bg-purple-100",
		textColor: "text-purple-600",
	},
];
