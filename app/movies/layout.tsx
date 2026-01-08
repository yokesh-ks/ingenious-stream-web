import { PageHeader } from "@/components/page-header";

export default function RadioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col overflow-hidden h-screen">
			<PageHeader title="Movies" />
			<main className="w-full h-full overflow-x-auto">{children}</main>
		</div>
	);
}
