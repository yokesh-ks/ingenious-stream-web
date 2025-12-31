import Link from 'next/link';
import { Music, ArrowRight } from 'lucide-react';
import { GenreCard } from '@/components/radio/genre-card';
import { Button } from '@/components/ui/button';
import { FEATURED_GENRES } from '../_constants/featured-genres';

export function GenresSection() {
  return (
    <section className="px-4 sm:px-8 mb-16 pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Browse by Genre</h2>
          </div>
          <Link href="/radio/genres">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {FEATURED_GENRES.map((genre, i) => (
            <GenreCard key={genre.name} genre={genre.name} image={genre.image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
