import { NextResponse } from 'next/server';

// These would normally be environment variables
const client_id = '2ce689cb08f641d0b0dfeb4865135662';
const client_secret = '612ef6115f2b4544bb9c69d755ebf4da';
const refresh_token = 'AQDPgj-B8bwKMC6Jm3Io9Eb0m5912lKFdheRU3FtwCZVjFDvDnCQomApX9mJHJEtJQ6AKg7q-QNOa1uzrzQlioTUatq36S-o7NpCkGqFDM70E7qRn3h7HElftSUdN3JTG3U';

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