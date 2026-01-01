import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GenresLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen pb-32 bg-background">
			<div className="px-4 sm:px-8 pt-8 pb-4">
				<div className="max-w-7xl mx-auto">
					<Link href="/radio">
						<Button variant="ghost" className="mb-4">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back to Radio
						</Button>
					</Link>
				</div>
			</div>
			{children}
		</div>
	);
}
