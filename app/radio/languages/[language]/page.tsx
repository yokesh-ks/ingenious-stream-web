import { Languages } from 'lucide-react';
import { StationCard } from '@/components/radio/station-card';
import { fetchStationsByLanguage } from './actions';

interface LanguagePageProps {
  params: Promise<{
    language: string;
  }>;
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { language: rawLanguage } = await params;
  const language = decodeURIComponent(rawLanguage);
  const stations = await fetchStationsByLanguage(language);

  return (
    <div className="min-h-screen pb-32 bg-background">
      <section className="px-4 sm:px-8 pt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Languages className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold capitalize">{language}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {stations.length} stations
              </p>
            </div>
          </div>

          {stations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No stations found for this language</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {stations.map((station) => (
                <StationCard key={station.stationuuid} station={station} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
