const https = require('https');

// Your Spotify credentials
const CLIENT_ID = '2ce689cb08f641d0b0dfeb4865135662';
const CLIENT_SECRET = '612ef6115f2b4544bb9c69d755ebf4da';
const AUTH_CODE = 'AQBOPplnTA8anK4QAVW17I57W8VfDrlF1qa3uDYPvM6v7L8SPxs2rUkYcVbI5ub_U6MIXHIvEHjYmN11cd2iUVOxK61Su8CZFm4Ni5I6Vf32Ku2MIEbvqm-qD0It4vv-f8evoeouJpz0YroxRAlo0htOXyoWdOXdH0K2c6AdL35wXl5Tb4q8xNKQIBVNz99Hs5VmQKoXb3HnIz-mf4a7OVOi_uHCfnGxM9ofmxlHSQ3yCsgb31NMpAvEqZZwUHhayeXRbw3jBrPvQqI';

// Possible redirect URIs to try
const redirectUris = [
  'http://localhost:3000/callback',
  'http://localhost:3001/callback',
  'https://localhost:3000/callback',
  'https://localhost:3001/callback',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3000/api/auth/callback/spotify',
  'http://localhost:3001/api/auth/callback/spotify',
  'https://wesleydalton.com/callback',
  'https://wesleydalton.com/api/spotify/callback',
  'https://wesleydalton.com'
];

// Function to try getting a token with a specific redirect URI
function tryWithRedirectUri(redirectUri) {
  return new Promise((resolve, reject) => {
    // Prepare the request data
    const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;
    const postData = new URLSearchParams({
      grant_type: 'authorization_code',
      code: AUTH_CODE,
      redirect_uri: redirectUri
    }).toString();

    const options = {
      hostname: 'accounts.spotify.com',
      port: 443,
      path: '/api/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authHeader,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Make the request
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ redirectUri, response, success: !response.error });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    // Write data to request body
    req.write(postData);
    req.end();
  });
}

// Try each redirect URI
async function tryAllRedirectUris() {
  console.log('Trying to get Spotify refresh token with multiple redirect URIs...\n');
  
  for (const uri of redirectUris) {
    try {
      console.log(`Trying with redirect URI: ${uri}`);
      const result = await tryWithRedirectUri(uri);
      
      if (result.success) {
        console.log('\n=== SUCCESS! ===');
        console.log(`Redirect URI: ${result.redirectUri}`);
        console.log('Refresh Token:', result.response.refresh_token);
        console.log('\nUpdate your code with:');
        console.log(`const refresh_token = '${result.response.refresh_token}';`);
        console.log('\nThis token has these scopes:', result.response.scope);
        return;
      } else {
        console.log(`  Error: ${result.response.error} - ${result.response.error_description}\n`);
      }
    } catch (error) {
      console.log(`  Error with URI ${uri}:`, error);
    }
  }
  
  console.log('\nNone of the tried redirect URIs worked. Please check your Spotify app settings and try again with the correct redirect URI.');
}

tryAllRedirectUris();