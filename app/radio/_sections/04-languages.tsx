import Link from 'next/link';
import { Languages, ArrowRight } from 'lucide-react';
import { LanguageCard } from '@/components/radio/language-card';
import { Button } from '@/components/ui/button';
import { FEATURED_LANGUAGES } from '../_constants/featured-languages';

export function LanguagesSection() {
  return (
    <section className="px-4 sm:px-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Explore by Language</h2>
          </div>
          <Link href="/radio/languages">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {FEATURED_LANGUAGES.map((lang, i) => (
            <LanguageCard key={lang} language={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
