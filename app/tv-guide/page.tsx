import { searchChannels } from "@/lib/fetcher/jio-apis";
import { ChannelSearch } from "./channel-search";
import { ChannelGrid } from "./channel-grid";

interface TVGuidePageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function TVGuidePage({ searchParams }: TVGuidePageProps) {
  const params = await searchParams;
  const query = params.query || "";

  // Fetch channels on the server side
  const channels = query ? await searchChannels(query) : [];

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">TV Guide</h1>
          <p className="text-muted-foreground">
            Search and explore live TV channels
          </p>
        </div>

        {/* Search Bar */}
        <ChannelSearch initialQuery={query} />

        {/* Results */}
        {query ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Search Results
                {channels.length > 0 && (
                  <span className="text-muted-foreground ml-2">
                    ({channels.length} channels found)
                  </span>
                )}
              </h2>
            </div>

            {channels.length > 0 ? (
              <ChannelGrid channels={channels} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-lg font-semibold mb-2">No channels found</h3>
                <p className="text-muted-foreground">
                  Try searching with a different term
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">Start searching</h3>
            <p className="text-muted-foreground">
              Enter a channel name to begin
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
