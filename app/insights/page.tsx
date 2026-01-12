import { allInsights } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

export const metadata = {
	title: "Insights",
	description:
		"Discover trends, analytics, and insights about movies, TV shows, and entertainment.",
};

export default function InsightsPage() {
	const insights = allInsights
		.filter((insight) => insight.published)
		.sort((a, b) => {
			return compareDesc(new Date(a.date), new Date(b.date));
		});

	return (
		<>
			{insights?.length ? (
				<div className="grid gap-4 md:grid-cols-2 md:gap-6">
					{insights.map((insight) => (
						<article
							key={insight._id}
							className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
						>
							<div className="flex flex-col justify-between space-y-4">
								<div className="space-y-2">
									<h2 className="text-xl font-medium tracking-tight line-clamp-1">
										{insight.title}
									</h2>
									{insight.description && (
										<p className="text-muted-foreground line-clamp-2">{insight.description}</p>
									)}
								</div>
								<div className="flex items-center justify-start">
									<p className="text-sm text-muted-foreground">
										{format(new Date(insight.date), "MMMM d, yyyy")}
									</p>
								</div>
							</div>
							<Link href={insight.slug} className="absolute inset-0">
								<span className="sr-only">View {insight.title}</span>
							</Link>
						</article>
					))}
				</div>
			) : (
				<p>No insights published.</p>
			)}
		</>
	);
}
