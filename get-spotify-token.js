const https = require('https');

// Your Spotify credentials
const CLIENT_ID = '2ce689cb08f641d0b0dfeb4865135662';
const CLIENT_SECRET = '612ef6115f2b4544bb9c69d755ebf4da';
const REDIRECT_URI = 'http://localhost:3000/callback'; // REPLACE THIS with your actual redirect URI
const AUTH_CODE = 'AQBOPplnTA8anK4QAVW17I57W8VfDrlF1qa3uDYPvM6v7L8SPxs2rUkYcVbI5ub_U6MIXHIvEHjYmN11cd2iUVOxK61Su8CZFm4Ni5I6Vf32Ku2MIEbvqm-qD0It4vv-f8evoeouJpz0YroxRAlo0htOXyoWdOXdH0K2c6AdL35wXl5Tb4q8xNKQIBVNz99Hs5VmQKoXb3HnIz-mf4a7OVOi_uHCfnGxM9ofmxlHSQ3yCsgb31NMpAvEqZZwUHhayeXRbw3jBrPvQqI';

// Prepare the request data
const authHeader = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;
const postData = new URLSearchParams({
  grant_type: 'authorization_code',
  code: AUTH_CODE,
  redirect_uri: REDIRECT_URI
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
      
      if (response.error) {
        console.error('Error:', response.error);
        console.error('Error Description:', response.error_description);
      } else {
        console.log('=== SPOTIFY AUTH SUCCESS ===');
        console.log('Access Token:', response.access_token);
        console.log('Refresh Token:', response.refresh_token);
        console.log('Token Type:', response.token_type);
        console.log('Expires In:', response.expires_in, 'seconds');
        console.log('Scope:', response.scope);
        console.log('\nUPDATE YOUR CODE WITH THIS REFRESH TOKEN:');
        console.log('const refresh_token = \'' + response.refresh_token + '\';');
      }
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

// Write data to request body
req.write(postData);
req.end();

console.log('Sending request to Spotify API...');