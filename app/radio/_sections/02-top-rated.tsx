import { Award } from 'lucide-react';
import { StationCard } from '@/components/radio/station-card';
import { RadioStation } from '@/lib/fetcher/browser-radio-api';

interface TopRatedSectionProps {
  stations: RadioStation[];
}

export function TopRatedSection({ stations }: TopRatedSectionProps) {
  return (
    <section className="px-4 sm:px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Top Rated Stations</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {stations.slice(0, 6).map((station) => (
            <StationCard key={station.stationuuid} station={station} />
          ))}
        </div>
      </div>
    </section>
  );
}
