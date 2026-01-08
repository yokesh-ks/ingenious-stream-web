import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col overflow-hidden h-screen">
			<PageHeader title="Home" />
			<main className="w-full h-full overflow-x-auto">{children}</main>
			<Footer />
		</div>
	);
}
