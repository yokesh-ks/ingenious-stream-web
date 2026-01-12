import { Suspense } from "react";
import DetailLayoutClient from "./layout-client";

interface DetailLayoutProps {
	children: React.ReactNode;
}

export default function DetailLayout({ children }: DetailLayoutProps) {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<DetailLayoutClient>{children}</DetailLayoutClient>
		</Suspense>
	);
}
