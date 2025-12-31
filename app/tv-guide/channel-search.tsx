"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

interface ChannelSearchProps {
  initialQuery: string;
}

export function ChannelSearch({ initialQuery }: ChannelSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value);

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value.trim()) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      router.push(`/tv-guide?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Search TV channels (e.g., sun, star, zee)..."
        className="pl-9 bg-muted/50 border-0"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={isPending}
      />
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="size-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
