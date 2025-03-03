import { NextResponse } from 'next/server';

// These would normally be environment variables
const client_id = '2ce689cb08f641d0b0dfeb4865135662';
const client_secret = '612ef6115f2b4544bb9c69d755ebf4da';
const refresh_token = 'AQDPgj-B8bwKMC6Jm3Io9Eb0m5912lKFdheRU3FtwCZVjFDvDnCQomApX9mJHJEtJQ6AKg7q-QNOa1uzrzQlioTUatq36S-o7NpCkGqFDM70E7qRn3h7HElftSUdN3JTG3U';

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Cache for the access token and recently played tracks
let tokenCache = {
  access_token: '',
  expires_at: 0, // timestamp when the token expires
};

// Define the track type
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

// Cache for recently played
let recentlyPlayedCache: {
  track: SpotifyTrack | null;
  timestamp: number;
} = {
  track: null,
  timestamp: 0, // timestamp when the cache was last updated
};

const getAccessToken = async () => {
  // Check if we have a cached token that is still valid
  const now = Date.now();
  if (tokenCache.access_token && now < tokenCache.expires_at) {
    console.log('Using cached access token');
    return { access_token: tokenCache.access_token };
  }

  console.log('Fetching new access token');
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

  const data = await response.json();
  
  // Cache the token with an expiry time
  // Spotify tokens typically last for 1 hour, but we'll use 50 minutes to be safe
  tokenCache = {
    access_token: data.access_token,
    expires_at: now + (data.expires_in * 1000 || 3000000), // 50 minutes in ms or default to 50min
  };
  
  return { access_token: data.access_token };
};

export async function GET() {
  try {
    // Set cache control headers to improve performance
    const headers = {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    };

    const { access_token } = await getAccessToken();

    // First try to get currently playing
    console.log('Fetching currently playing track');
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // If currently playing exists and is valid (status 200), return it
    if (nowPlayingResponse.status === 200) {
      const song = await nowPlayingResponse.json();
      
      // Only return if actually playing (could be paused)
      if (song.is_playing && song.item) {
        console.log('Currently playing track found');
        
        const currentTrack: SpotifyTrack = {
          album: {
            name: song.item.album.name,
            images: song.item.album.images,
          },
          artists: song.item.artists,
          name: song.item.name,
          external_urls: song.item.external_urls,
          id: song.item.id,
        };
        
        return NextResponse.json({
          isPlaying: true,
          track: currentTrack,
        }, { headers });
      }
    }

    // Check if we have recently played cache that's less than 2 minutes old
    const now = Date.now();
    if (recentlyPlayedCache.track && now - recentlyPlayedCache.timestamp < 120000) {
      console.log('Using cached recently played track');
      return NextResponse.json({
        isPlaying: false,
        track: recentlyPlayedCache.track,
      }, { headers });
    }

    // If nothing playing, fallback to recently played
    console.log('Fetching recently played tracks');
    const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store', // Ensure we don't use browser cache
    });

    if (recentlyPlayedResponse.status === 200) {
      const { items } = await recentlyPlayedResponse.json();
      
      if (items && items.length > 0) {
        const song = items[0].track;
        
        // Create track with proper type
        const recentTrack: SpotifyTrack = {
          album: {
            name: song.album.name,
            images: song.album.images,
          },
          artists: song.artists,
          name: song.name,
          external_urls: song.external_urls,
          id: song.id,
        };
        
        // Cache the recently played track
        recentlyPlayedCache = {
          track: recentTrack,
          timestamp: now,
        };
        
        console.log('Recently played track found');
        return NextResponse.json({
          isPlaying: false,
          track: recentTrack,
        }, { headers });
      }
    }

    // No track found, provide a fallback song
    console.log('No track found, using fallback');
    
    const fallbackTrack: SpotifyTrack = {
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
    };
    
    // Cache this fallback so we don't need to build it again
    recentlyPlayedCache = {
      track: fallbackTrack,
      timestamp: now,
    };
    
    return NextResponse.json({ 
      isPlaying: false, 
      track: fallbackTrack 
    }, { headers });
  } catch (error) {
    console.error('Error in Spotify API:', error);
    return NextResponse.json(
      { error: 'Error fetching Spotify data' },
      { status: 500 }
    );
  }
}