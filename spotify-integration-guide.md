# Spotify Integration Guide

## Step 1: Install necessary packages

```bash
npm install next-auth spotify-web-api-node --save
```

## Step 2: Create Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Note your Client ID and Client Secret
4. Add a Redirect URI: `http://localhost:3000/api/auth/callback/spotify`
5. Generate a refresh token by following [this guide](https://benwiz.com/blog/create-spotify-refresh-token/)

## Step 3: Set up environment variables

Create a `.env.local` file in your project root with:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 4: Create Spotify API route

Create file `src/app/api/spotify/route.ts`:

```typescript
import { NextResponse } from 'next/server';

// Get environment variables
const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
  });

  return response.json();
};

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // First try to get currently playing
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // If currently playing exists and is valid (status 200), return it
    if (nowPlayingResponse.status === 200) {
      const song = await nowPlayingResponse.json();
      
      // Only return if actually playing (could be paused)
      if (song.is_playing) {
        return NextResponse.json({
          isPlaying: true,
          track: {
            album: {
              name: song.item.album.name,
              images: song.item.album.images,
            },
            artists: song.item.artists,
            name: song.item.name,
            external_urls: song.item.external_urls,
            id: song.item.id,
          },
        });
      }
    }

    // If nothing playing, fallback to recently played
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayedResponse.status === 200) {
      const { items } = await recentlyPlayedResponse.json();
      
      if (items && items.length > 0) {
        const song = items[0].track;
        
        return NextResponse.json({
          isPlaying: false,
          track: {
            album: {
              name: song.album.name,
              images: song.album.images,
            },
            artists: song.artists,
            name: song.name,
            external_urls: song.external_urls,
            id: song.id,
          },
        });
      }
    }

    // Nothing found
    return NextResponse.json({ isPlaying: false, track: null });
  } catch (error) {
    console.error('Error in Spotify API:', error);
    return NextResponse.json(
      { error: 'Error fetching Spotify data' },
      { status: 500 }
    );
  }
}
```

## Step 5: Update NowPlaying component

Update your `src/components/NowPlaying.tsx` file:

```tsx
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NowPlaying() {
  const [expanded, setExpanded] = useState(false);
  
  // Use SWR for data fetching with auto-revalidation
  const { data, error, isLoading } = useSWR<SpotifyData>(
    '/api/spotify',
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  const track = data?.track;
  const isPlaying = data?.isPlaying;
  const loading = isLoading;

  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };

  return (
    <motion.div
      className={`glass-effect rounded-md overflow-hidden transition-all duration-300 ${
        expanded ? 'w-[280px]' : 'w-[42px] h-[42px]'
      }`}
      animate={{ width: expanded ? 280 : 42, height: expanded ? 'auto' : 42 }}
      transition={{ duration: 0.3 }}
    >
      <button 
        onClick={toggleExpanded}
        className="w-full h-full flex items-center justify-center text-spotify hover:text-spotify/80 transition-colors duration-200"
        aria-label={expanded ? "Collapse music player" : "Expand music player"}
      >
        {!expanded && (
          <FaSpotify size={24} className={isPlaying ? "animate-pulse-slow" : ""} />
        )}
        
        {expanded && (
          <div className="p-3 w-full">
            <div className="flex items-center mb-2">
              <FaSpotify size={20} className="text-spotify mr-2" />
              <p className="text-sm font-mono text-textPrimary">
                {loading ? 'Connecting to Spotify...' : 
                 error ? 'Error connecting' :
                 isPlaying ? 'Now Playing' : 'Recently Played'}
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
        )}
      </button>
    </motion.div>
  );
}
```

## Step 6: Test your implementation

1. Run your Next.js development server:
```bash
npm run dev
```

2. Your NowPlaying component should now show your real Spotify data!

## How it works

1. The API route uses your Spotify refresh token to get an access token
2. It first checks if you're currently playing anything
3. If not, it falls back to your recently played tracks
4. The component uses SWR to fetch data with automatic revalidation
5. The UI updates based on whether you're actively playing or showing recent tracks