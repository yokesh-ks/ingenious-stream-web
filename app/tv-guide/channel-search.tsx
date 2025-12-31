"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { searchChannels } from "@/lib/fetcher/jio-apis";
import { ChannelGrid } from "./channel-grid";
import type { JioChannel } from "@/lib/fetcher/jio-apis";

export function ChannelSearch() {
  const [query, setQuery] = useState("");
  const [channels, setChannels] = useState<JioChannel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const results = await searchChannels(query);
          setChannels(results);
        } catch (error) {
          console.error("Error searching channels:", error);
          setChannels([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setChannels([]);
      }
    }, 300); // Debounce search

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return (
    <>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search TV channels (e.g., sun, star, zee)..."
          className="pl-9 bg-muted/50 border-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="size-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
          </div>
        )}
      </div>

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
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="size-8 border-4 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Searching...</p>
            </div>
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
    </>
  );
}
