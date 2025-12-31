import { ChannelSearch } from "./channel-search";

export default function TVGuidePage() {
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

        {/* Search Component handles all search logic */}
        <ChannelSearch />
      </div>
    </div>
  );
}
