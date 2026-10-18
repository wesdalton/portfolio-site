const https = require('https');

// Your Spotify credentials
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI = 'http://localhost:3000/callback'; // REPLACE THIS with your actual redirect URI
const AUTH_CODE = process.env.SPOTIFY_AUTH_CODE || '';

if (!CLIENT_ID || !CLIENT_SECRET || !AUTH_CODE) {
  throw new Error('Configure the required SPOTIFY_* environment variables before running this helper.');
}


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
        console.log('\nSet SPOTIFY_REFRESH_TOKEN in your local environment:');
        console.log('Store the refresh token in your local environment, never in source files.');
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