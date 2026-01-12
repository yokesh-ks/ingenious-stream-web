import { allInsights } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mdx } from "@/components/content/mdx-components";

interface InsightPageProps {
	params: {
		slug: string;
	};
}

export async function generateStaticParams() {
	return allInsights.map((insight) => ({
		slug: insight.slugAsParams,
	}));
}

export async function generateMetadata({ params }: InsightPageProps) {
	const resolvedParams = await params;
	const insight = allInsights.find((insight) => insight.slugAsParams === resolvedParams.slug);

	if (!insight) {
		return;
	}

	const { title, description } = insight;

	return {
		title: `${title} – Insights`,
		description: description,
	};
}

export default async function InsightPage({ params }: InsightPageProps) {
	const resolvedParams = await params;
	const insight = allInsights.find((insight) => insight.slugAsParams === resolvedParams.slug);

	if (!insight) {
		notFound();
	}

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">{insight.title}</h1>
			</div>
			<Mdx code={insight.body.code} />
			<hr className="my-4" />
			<div className="flex justify-center py-6">
				<Link href="/insights" className={cn(buttonVariants({ variant: "ghost" }))}>
					← See all insights
				</Link>
			</div>
		</div>
	);
}
