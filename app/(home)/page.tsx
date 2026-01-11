import HeroSection from "./_sections/00-hero-section";
import GridCards from "./_sections/01-grid-cards";

export default function Home() {
	return (
		<div className="w-full h-full overflow-y-auto bg-background">
			<div className="max-w-[1400px] mx-auto p-6 space-y-8">
				{/* Hero Section */}
				<HeroSection />

				{/* Cards Grid */}
				<GridCards />
			</div>
		</div>
	);
}
