import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';
import useSWR from 'swr';

interface SpotifyTrack {
  album: {
    name: string;
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
  external_urls: {
    spotify: string;
  };
  id: string;
}

interface SpotifyData {
  isPlaying: boolean;
  track: SpotifyTrack | null;
}

// Fallback data to always show something
const fallbackData: SpotifyData = {
  isPlaying: false,
  track: {
    album: {
      name: "Blonde",
      images: [{ url: "https://i.scdn.co/image/ab67616d0000b2737004048e5dc4b8cf798d168b" }]
    },
    artists: [{ name: "Frank Ocean" }],
    name: "Ivy",
    external_urls: {
      spotify: "https://open.spotify.com/track/2ZWlPOoWh0626oTaHrnl2a"
    },
    id: "2ZWlPOoWh0626oTaHrnl2a"
  }
};

const fetcher = (url: string) => 
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .catch(err => {
      console.error('Error fetching Spotify data:', err);
      // Return fallback on error
      return fallbackData;
    });

export default function NowPlaying() {
  const [expanded, setExpanded] = useState(true);
  // State to track if we need to show fallback after timeout
  const [showFallback, setShowFallback] = useState(false);
  
  // Use a stable URL to prevent excessive revalidation
  // But still add a small query param for cache control
  const cacheKey = `/api/spotify?v=1`;
  
  // Use SWR for data fetching
  const { data, error, isLoading, mutate } = useSWR<SpotifyData>(
    cacheKey,
    fetcher,
    {
      refreshInterval: 30000, // Check every 30 seconds
      revalidateOnFocus: true,
      dedupingInterval: 15000,
      fallbackData: fallbackData, // Always have fallback data
    }
  );
  
  // Force a refresh on mount
  useEffect(() => {
    // Immediate refresh when component mounts
    mutate();
  }, [mutate]);
  
  // If loading takes too long, show fallback
  useEffect(() => {
    if (isLoading) {
      // If still loading after 3 seconds, show fallback
      const timeout = setTimeout(() => {
        setShowFallback(true);
      }, 3000);
      
      return () => clearTimeout(timeout);
    } else {
      setShowFallback(false);
    }
  }, [isLoading]);

  // Get track info from data or fallback
  const track = data?.track || fallbackData.track;
  const isPlaying = data?.isPlaying || false;
  const loading = isLoading && !showFallback;

    return (
      <motion.div
        className="glass-effect rounded-md overflow-hidden w-[280px]"
        transition={{ duration: 0.3 }}
      >
        <div className="p-3 w-full">
          <div className="flex items-center mb-4">
            <FaSpotify size={20} className="text-spotify mr-2" />
            <p className="text-sm font-mono text-textPrimary flex items-center">
              {loading ? 'Connecting to Spotify...' :
               error ? 'Error connecting' :
               isPlaying ? (
                <>
                  Now Playing
                  <span className="ml-2 h-2 w-2 rounded-full bg-[#1DB954] inline-block animate-pulse-slow shadow-[0_0_8px_#1DB954] border border-[#1DB954]/30"></span>
                </>
               ) : (
                <>
                  Recently Played
                  <span className="ml-2 h-2 w-2 rounded-full bg-[#F9D342] inline-block shadow-[0_0_8px_#F9D342] border border-[#F9D342]/30"></span>
                </>
               )}
            </p>
          </div>

          {loading ? (
            <div className="animate-pulse flex space-x-4 items-center">
              <div className="rounded-md bg-tertiary h-12 w-12"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 bg-tertiary rounded"></div>
                <div className="h-2 bg-tertiary rounded w-5/6"></div>
              </div>
            </div>
          ) : (
            <a 
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-3 items-center hover-lift"
            >
              <div className="h-12 w-12 rounded-md shadow-md overflow-hidden relative">
                <img 
                  src={track.album.images[0].url} 
                  alt={`${track.album.name} cover`}
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-textPrimary font-medium truncate">
                  {track.name}
                </p>
                <p className="text-xs text-textSecondary truncate">
                  {track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
            </a>
          )}
        </div>
      </motion.div>
    );
  }