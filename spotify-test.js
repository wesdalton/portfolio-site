// Simple script to test Spotify credentials

// Spotify credentials from your app 
const client_id = '2ce689cb08f641d0b0dfeb4865135662';
const client_secret = '612ef6115f2b4544bb9c69d755ebf4da';
const refresh_token = 'AQDPgj-B8bwKMC6Jm3Io9Eb0m5912lKFdheRU3FtwCZVjFDvDnCQomApX9mJHJEtJQ6AKg7q-QNOa1uzrzQlioTUatq36S-o7NpCkGqFDM70E7qRn3h7HElftSUdN3JTG3U';

// API endpoints
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;

// Get an access token from the refresh token
async function getAccessToken() {
  console.log('Trying to get access token...');
  
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  
  try {
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
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting access token:', response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Got access token successfully!');
    return data.access_token;
  } catch (error) {
    console.error('Exception getting access token:', error);
    return null;
  }
}

// Check current playback
async function checkCurrentlyPlaying(accessToken) {
  console.log('Checking currently playing...');
  
  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    console.log('Currently playing status:', response.status);
    
    if (response.status === 204) {
      console.log('No track currently playing');
      return null;
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting currently playing:', response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Currently playing data:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Exception checking currently playing:', error);
    return null;
  }
}

// Check recently played
async function checkRecentlyPlayed(accessToken) {
  console.log('Checking recently played...');
  
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting recently played:', response.status, errorText);
      return null;
    }
    
    const data = await response.json();
    console.log('Recently played items found:', data.items?.length || 0);
    
    if (data.items && data.items.length > 0) {
      console.log('Most recent track:', JSON.stringify(data.items[0].track, null, 2));
      return data.items[0].track;
    }
    
    return null;
  } catch (error) {
    console.error('Exception checking recently played:', error);
    return null;
  }
}

// Run the test
async function runTest() {
  console.log('===== SPOTIFY API TEST =====');
  
  // Step 1: Get access token
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error('Failed to get access token - check client ID, client secret, and refresh token');
    return;
  }
  
  // Step 2: Check currently playing
  const currentTrack = await checkCurrentlyPlaying(accessToken);
  
  // Step 3: Check recently played if needed
  if (!currentTrack) {
    console.log('\nTrying recently played as fallback...');
    const recentTrack = await checkRecentlyPlayed(accessToken);
    
    if (!recentTrack) {
      console.log('No recently played tracks found');
    }
  }
  
  console.log('\n===== TEST COMPLETE =====');
}

// Execute the test
runTest().catch(error => {
  console.error('Error running test:', error);
});