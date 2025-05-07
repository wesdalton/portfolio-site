# Spotify Authorization Guide

## Step 1: Check your registered redirect URIs

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Select your app (the one with client ID: 2ce689cb08f641d0b0dfeb4865135662)
4. Click "Edit Settings" and check what redirect URIs are registered
5. Make note of one of the registered redirect URIs (you'll need this for Step 2)

## Step 2: Generate an authorization URL

Replace `YOUR_REDIRECT_URI` in the URL below with one of your registered redirect URIs (exactly as it appears in your Spotify app settings):

```
https://accounts.spotify.com/authorize?client_id=2ce689cb08f641d0b0dfeb4865135662&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-read-recently-played&show_dialog=true
```

## Step 3: Get your authorization code

1. Visit the URL you created in Step 2
2. Authorize the application
3. You'll be redirected to your redirect URI with a `code` parameter in the URL
4. Copy the entire URL from your browser's address bar after authorizing

## Step 4: Exchange the code for a refresh token

1. Create a file called `get-token.js` with the following content:

```javascript
const { exec } = require('child_process');

// Your Spotify credentials
const CLIENT_ID = '2ce689cb08f641d0b0dfeb4865135662';
const CLIENT_SECRET = '612ef6115f2b4544bb9c69d755ebf4da';
const REDIRECT_URI = 'YOUR_REDIRECT_URI'; // Same as you used in Step 2
const AUTH_CODE = 'YOUR_AUTH_CODE'; // The code from the redirected URL (without any URL parameters)

// Build the curl command
const curlCommand = `curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}" -d "grant_type=authorization_code&code=${AUTH_CODE}&redirect_uri=${REDIRECT_URI}" https://accounts.spotify.com/api/token`;

// Execute the command
exec(curlCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  
  const response = JSON.parse(stdout);
  console.log('=== SPOTIFY AUTH RESULT ===');
  console.log('Access Token:', response.access_token);
  console.log('Refresh Token:', response.refresh_token);
  console.log('=========================');
  console.log('Use the refresh token in your application!');
});
```

2. Replace `YOUR_REDIRECT_URI` with the same redirect URI you used in Step 2
3. Replace `YOUR_AUTH_CODE` with the code parameter from your redirected URL
4. Run the script with: `node get-token.js`
5. The script will output your refresh token, which you can use in your application

## Step 5: Update your code

Update your `src/app/api/spotify/route.ts` file with the new refresh token:

```typescript
// Update this line
const refresh_token = 'YOUR_NEW_REFRESH_TOKEN';
```

Also, uncomment the "currently playing" section since you now have the correct permissions.

## Alternative Method Using curl Directly

If you prefer, you can also generate the token using curl directly:

1. After getting the authorization code, run this command in your terminal:

```bash
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic $(echo -n 2ce689cb08f641d0b0dfeb4865135662:612ef6115f2b4544bb9c69d755ebf4da | base64)" -d "grant_type=authorization_code&code=YOUR_AUTH_CODE&redirect_uri=YOUR_REDIRECT_URI" https://accounts.spotify.com/api/token
```

2. Replace `YOUR_AUTH_CODE` and `YOUR_REDIRECT_URI` with your values
3. This will return a JSON response with your refresh token