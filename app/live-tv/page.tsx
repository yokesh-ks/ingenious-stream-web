"use client";

import { Search, ChevronLeft, ChevronRight, MoreVertical, Play, Users, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  fetchLanguageMetadata,
  fetchChannelsByLanguage,
  getTrendingChannels,
  type LanguageMetadata,
  type LiveTVChannel,
} from "@/lib/fetcher/live-tv-apis";

const liveTVNavItems = [
  { label: "All Channels", active: true },
  { label: "Entertainment", active: false },
  { label: "News", active: false },
  { label: "Sports", active: false },
  { label: "Movies", active: false },
  { label: "Favourites", active: false },
];

const languages = [
  { name: "Tamil", icon: "🎬", color: "bg-orange-500" },
  { name: "Telugu", icon: "📺", color: "bg-blue-500" },
  { name: "Hindi", icon: "🎭", color: "bg-red-500" },
  { name: "Malayalam", icon: "🎪", color: "bg-green-500" },
  { name: "Kannada", icon: "🎨", color: "bg-purple-500" },
  { name: "English", icon: "🌍", color: "bg-indigo-500" },
];

export default function LiveTVPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("tamil");
  const [languageMetadata, setLanguageMetadata] = useState<LanguageMetadata[]>([]);
  const [tamilChannels, setTamilChannels] = useState<LiveTVChannel[]>([]);
  const [teluguChannels, setTeluguChannels] = useState<LiveTVChannel[]>([]);
  const [hindiChannels, setHindiChannels] = useState<LiveTVChannel[]>([]);
  const [malayalamChannels, setMalayalamChannels] = useState<LiveTVChannel[]>([]);
  const [kannadaChannels, setKannadaChannels] = useState<LiveTVChannel[]>([]);
  const [englishChannels, setEnglishChannels] = useState<LiveTVChannel[]>([]);
  const [trendingChannels, setTrendingChannels] = useState<LiveTVChannel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [metadata, tamil, telugu, hindi, malayalam, kannada, english, trending] = await Promise.all([
          fetchLanguageMetadata(),
          fetchChannelsByLanguage("tamil"),
          fetchChannelsByLanguage("telugu"),
          fetchChannelsByLanguage("hindi"),
          fetchChannelsByLanguage("malayalam"),
          fetchChannelsByLanguage("kannada"),
          fetchChannelsByLanguage("english"),
          getTrendingChannels(6),
        ]);

        setLanguageMetadata(metadata);
        setTamilChannels(tamil);
        setTeluguChannels(telugu);
        setHindiChannels(hindi);
        setMalayalamChannels(malayalam);
        setKannadaChannels(kannada);
        setEnglishChannels(english);
        setTrendingChannels(trending);
      } catch (error) {
        console.error("Error loading live TV data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const renderChannelCard = (channel: LiveTVChannel) => (
    <div
      key={channel.channel_id}
      className="group relative bg-card rounded-2xl p-4 hover:bg-muted/50 transition-colors cursor-pointer min-w-[200px]"
    >
      <div className="relative aspect-video rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 mb-3 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Tv className="size-12 text-white/30" />
        </div>
        {channel.isLive && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1 text-xs font-bold">
            <span className="size-2 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
        )}
        {channel.isHD && (
          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-0.5 rounded-md text-xs font-bold">
            HD
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <Button
            size="icon"
            className="size-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Play className="size-6 fill-current" />
          </Button>
        </div>
      </div>
      <h3 className="font-semibold text-sm mb-1 line-clamp-1">{channel.channel_name}</h3>
      <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{channel.currentProgram}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="size-3" />
          <span>{channel.viewerCount?.toLocaleString()}</span>
        </div>
        {channel.rating && (
          <div className="flex items-center gap-1 text-xs">
            <span className="text-yellow-500">⭐</span>
            <span className="font-medium">{channel.rating}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderLanguageSection = (
    languageName: string,
    channels: LiveTVChannel[],
    emoji: string,
    color: string
  ) => (
    <div key={languageName} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("size-10 rounded-xl flex items-center justify-center text-2xl", color)}>
            {emoji}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{languageName}</h2>
            <p className="text-sm text-muted-foreground">
              {channels.length} channels available
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-full">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {channels.map(renderChannelCard)}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            className="pl-9 bg-muted/50 border-0"
          />
        </div>

        {/* Live TV Navigation */}
        <div>
          <h2 className="text-sm text-muted-foreground mb-3">Live TV</h2>
          <div className="flex gap-2 flex-wrap">
            {liveTVNavItems.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "gap-2",
                  item.active && "bg-primary text-primary-foreground"
                )}
              >
                <span className="size-4 flex items-center justify-center">
                  {item.label === "All Channels" && "📺"}
                  {item.label === "Entertainment" && "🎬"}
                  {item.label === "News" && "📰"}
                  {item.label === "Sports" && "⚽"}
                  {item.label === "Movies" && "🎥"}
                  {item.label === "Favourites" && "❤️"}
                </span>
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Banner and Language Sections */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner */}
            <div className="relative h-[200px] rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 p-8">
              <div className="relative z-10">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Live<span className="text-yellow-300"> TV</span>
                </h1>
                <h1 className="text-4xl font-bold text-yellow-300">Streaming</h1>
                <p className="text-white/80 mt-2 text-sm">Watch your favorite channels in multiple languages</p>
              </div>
              <div className="absolute right-8 bottom-0 h-full flex items-end">
                <div className="relative w-32 h-40">
                  <div className="absolute inset-0 bg-white/10 rounded-t-full" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl">
                    📺
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-1/3 text-white text-2xl">📡 🎬 ✨</div>
              <div className="absolute bottom-8 left-1/3 text-white/50">⭐</div>
            </div>

            {/* Trending Now */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Trending Now</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="size-8 rounded-full">
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 rounded-full">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trendingChannels.map((channel) => (
                  <div
                    key={channel.channel_id}
                    className="group relative bg-card rounded-2xl p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 mb-3 flex items-center justify-center overflow-hidden">
                      <Tv className="size-10 text-white/30" />
                      {channel.isLive && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1 text-xs font-bold">
                          <span className="size-2 bg-white rounded-full animate-pulse"></span>
                          LIVE
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <Button
                          size="icon"
                          className="size-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="size-6 fill-current" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{channel.channel_name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{channel.currentProgram}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="size-3" />
                        <span>{channel.viewerCount?.toLocaleString()}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{channel.language}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Sections */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Tv className="size-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Loading channels...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {renderLanguageSection("Tamil", tamilChannels, "🎬", "bg-orange-500")}
                {renderLanguageSection("Telugu", teluguChannels, "📺", "bg-blue-500")}
                {renderLanguageSection("Hindi", hindiChannels, "🎭", "bg-red-500")}
                {renderLanguageSection("Malayalam", malayalamChannels, "🎪", "bg-green-500")}
                {renderLanguageSection("Kannada", kannadaChannels, "🎨", "bg-purple-500")}
                {renderLanguageSection("English", englishChannels, "🌍", "bg-indigo-500")}
              </div>
            )}
          </div>

          {/* Right Column - User Profile and Language Browse */}
          <div className="space-y-6">
            {/* User Profile */}
            <div className="bg-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>VK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">Viewer Kumar</h3>
                    <p className="text-xs text-muted-foreground">Premium Subscriber</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm mb-4">
                <div>
                  <span className="font-semibold">48</span>
                  <span className="text-muted-foreground ml-1">Channels</span>
                </div>
                <div>
                  <span className="font-semibold">320</span>
                  <span className="text-muted-foreground ml-1">Hours</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="size-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  📺
                </div>
                <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  ⭐
                </div>
                <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  ❤️
                </div>
              </div>
            </div>

            {/* Browse by Language */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Browse by Language</h2>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div
                    key={language.name}
                    onClick={() => setSelectedLanguage(language.name.toLowerCase())}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer",
                      selectedLanguage === language.name.toLowerCase() && "bg-muted/50"
                    )}
                  >
                    <div className={cn(
                      "size-16 rounded-2xl flex items-center justify-center text-2xl",
                      language.color
                    )}>
                      {language.icon}
                    </div>
                    <span className="text-sm font-medium">{language.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4">Channel Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Channels</span>
                  <span className="font-semibold">820+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Live Now</span>
                  <span className="font-semibold">652</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">HD Channels</span>
                  <span className="font-semibold">420</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Languages</span>
                  <span className="font-semibold">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
