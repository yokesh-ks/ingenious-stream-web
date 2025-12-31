import { fetchHomePageData } from './actions';
import { GenresSection } from './_sections/01-genres';
import { TopRatedSection } from './_sections/02-top-rated';
import { TrendingSection } from './_sections/03-trending';
import { LanguagesSection } from './_sections/04-languages';

export default async function RadioPage() {
  const data = await fetchHomePageData();
  const topStations = data.topStations || [];
  const trendingStations = data.trendingStations || [];

  return (
    <div className="min-h-screen pb-32 bg-background">
      <GenresSection />
      <TopRatedSection stations={topStations} />
      <TrendingSection stations={trendingStations} />
      <LanguagesSection />
    </div>
  );
}
