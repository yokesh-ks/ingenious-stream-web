import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";

export default function RadioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col overflow-hidden h-screen">
			<PageHeader title="Games Center" />
			<main className="w-full h-full overflow-y-auto space-y-8">{children}</main>
			<Footer />
		</div>
	);
}
