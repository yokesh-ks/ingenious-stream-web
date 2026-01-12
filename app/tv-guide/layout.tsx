import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";

export default function RadioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col overflow-hidden h-screen">
			<PageHeader title="Movies" />
			<main className="w-full h-full overflow-y-auto p-6 space-y-8">{children}</main>
			<Footer />
		</div>
	);
}
