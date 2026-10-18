# Optional Spotify credentials

The portfolio homepage no longer uses Spotify. Its legacy `/api/spotify` endpoint
is optional and returns an inactive response when credentials are absent.

Configure these server environment variables only if you want to retain that endpoint:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

For local development, use an ignored `.env.local` file. For deployment, use the
hosting provider's environment settings. Never put secrets in source files or use
`NEXT_PUBLIC_` variables for them.

The local token-exchange helpers read `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`,
and `SPOTIFY_AUTH_CODE` from the process environment. Their returned tokens are
credentials: save them only in the local or hosting environment, never in Git.

Credentials previously embedded in this public repository must be rotated in
Spotify. Removing literals from the current files does not remove Git history.
