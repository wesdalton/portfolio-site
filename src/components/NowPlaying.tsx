import { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
  import { FiMusic } from 'react-icons/fi';
  import { FaSpotify } from 'react-icons/fa';

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

  export default function NowPlaying() {
    const [data, setData] = useState<SpotifyData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Initial data fetch (with loading state)
    const initialFetch = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const newData = await response.json();
        setData(newData);
        setError(false);
      } catch (error) {
        console.error('Error fetching now playing:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    // Silent refresh (no loading state)
    const silentRefresh = async () => {
      try {
        console.log("Refreshing Spotify data...");
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          console.log("Spotify refresh failed - response not OK");
          return; // Silently fail on refresh
        }
        const newData = await response.json();
        console.log("Got new Spotify data:", newData);
        
        // Always update the data to ensure freshness
        setData(newData);
        setError(false);
      } catch (error) {
        console.error('Error refreshing Spotify data:', error);
        // Don't set error state on silent refresh
      }
    };

    useEffect(() => {
      // Initial fetch when component mounts
      initialFetch();

      // Immediate first refresh after 3 seconds
      const initialTimeout = setTimeout(silentRefresh, 3000);
      
      // Set up silent refresh interval (every 5 seconds)
      const interval = setInterval(silentRefresh, 5000);

      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };
    }, []);

    const track = data?.track;
    const isPlaying = data?.isPlaying;

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
          ) : error ? (
            <div className="text-sm text-textSecondary">
              Unable to connect to Spotify
            </div>
          ) : track ? (
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
          ) : (
            <div className="text-sm text-textSecondary">
              Not playing anything right now
            </div>
          )}
        </div>
      </motion.div>
    );
  }