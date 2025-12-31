"use client";

import React from 'react';
import { Play, Pause, Radio as RadioIcon, Volume2, VolumeX, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';

export function PlayerBar() {
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    setVolume,
    togglePlay,
    toggleFavorite,
    isFavorite
  } = usePlayer();

  if (!currentStation) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Station Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {currentStation.favicon ? (
                <img
                  src={currentStation.favicon}
                  alt={currentStation.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={cn(
                'w-full h-full items-center justify-center bg-gradient-to-br from-primary/20 to-muted',
                currentStation.favicon ? 'hidden' : 'flex'
              )}>
                <RadioIcon className="w-6 h-6 text-primary/60" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{currentStation.name}</h4>
              <p className="text-xs text-muted-foreground truncate">
                {currentStation.country} {currentStation.tags && `• ${currentStation.tags.split(',')[0]}`}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(currentStation)}
            >
              <Heart className={cn(
                'w-5 h-5',
                isFavorite(currentStation.stationuuid) ? 'fill-primary text-primary' : ''
              )} />
            </Button>
            <Button
              size="icon"
              onClick={togglePlay}
              disabled={isLoading}
              className="w-12 h-12 rounded-full"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </Button>
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center gap-2 w-32">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            <Slider
              value={[volume * 100]}
              onValueChange={(value) => setVolume(value[0] / 100)}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
