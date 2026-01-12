import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";

export default function RadioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col overflow-hidden h-screen">
			<PageHeader title="Movies Suggest" />
			<main className="w-full h-full overflow-y-auto">{children}</main>
			<Footer />
		</div>
	);
}
