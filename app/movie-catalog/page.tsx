import { Suspense } from "react";
import DiscoverClient from "./discover-client";

export default function Discover() {
	return (
		<Suspense fallback={
			<div className="container flex justify-center pb-[30dvh]">
				<div className="text-center">
					<h1 className="text-2xl">Loading movies...</h1>
				</div>
			</div>
		}>
			<DiscoverClient />
		</Suspense>
	);
}
