import { Loader2 } from 'lucide-react';

export default function RadioLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading radio stations...</p>
      </div>
    </div>
  );
}
