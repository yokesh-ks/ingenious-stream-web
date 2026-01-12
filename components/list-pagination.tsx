import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListPaginationProps {
	currentPage: number;
	totalPages: number;
	baseUrl?: string;
}

export function ListPagination({ currentPage, totalPages, baseUrl = "" }: ListPaginationProps) {
	if (totalPages <= 1) return null;

	const prevPage = currentPage - 1;
	const nextPage = currentPage + 1;

	const getPageUrl = (page: number) => {
		const params = new URLSearchParams();
		params.set("page", page.toString());
		return `${baseUrl}?${params.toString()}`;
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			{prevPage >= 1 ? (
				<Button variant="outline" size="sm" asChild>
					<Link href={getPageUrl(prevPage)}>
						<ChevronLeft className="h-4 w-4 mr-1" />
						Previous
					</Link>
				</Button>
			) : (
				<Button variant="outline" size="sm" disabled>
					<ChevronLeft className="h-4 w-4 mr-1" />
					Previous
				</Button>
			)}

			<span className="text-sm text-muted-foreground">
				Page {currentPage} of {totalPages}
			</span>

			{nextPage <= totalPages ? (
				<Button variant="outline" size="sm" asChild>
					<Link href={getPageUrl(nextPage)}>
						Next
						<ChevronRight className="h-4 w-4 ml-1" />
					</Link>
				</Button>
			) : (
				<Button variant="outline" size="sm" disabled>
					Next
					<ChevronRight className="h-4 w-4 ml-1" />
				</Button>
			)}
		</div>
	);
}
