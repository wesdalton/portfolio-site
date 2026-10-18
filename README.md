# Wesley Dalton

Source for [wesleydalton.com](https://wesleydalton.com): a minimal portfolio with a
short introduction, selected projects, experience, and contact links.

The homepage uses server-rendered React and CSS. Its layout needs no animation
library, scroll listeners, or music API requests. It supports keyboard navigation,
small screens, and reduced-motion preferences.

## Development

Use Node.js 20 or later and the checked-in npm lockfile.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

```sh
npm run build
npm start
```

## Content

- `src/components/Hero.tsx` and `About.tsx`: introduction and education.
- `src/components/Projects.tsx`: selected work and supporting links.
- `src/components/Experience.tsx`: work history.
- `src/components/Contact.tsx`: contact links.
- `src/styles/globals.css`: typography, spacing, colors, and responsive layout.
- `src/app/layout.tsx` and `src/components/StructuredData.tsx`: search metadata.

The existing document routes remain available:

- `/resume` redirects to the hosted résumé.
- `/kraken` redirects to the KRAKEN paper in `public/`.
- `/headline-classifier` redirects to the course project report in `public/`.

The legacy Spotify API route remains available, but the homepage does not call it
or require Spotify credentials.

If retaining that integration, configure `SPOTIFY_CLIENT_ID`,
`SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` as server environment variables.
Without them, the endpoint returns an inactive response without contacting Spotify.
The local OAuth helpers also read environment variables (`SPOTIFY_AUTH_CODE` for
the exchange helpers). Never put returned credentials in source files. Credentials
previously committed to this repository must be rotated in Spotify; removing them
from the current source does not remove them from Git history.

## Deployment

The repository is connected to the existing Vercel project. Branch pushes create
previews; updates to `main` publish the production site. Keep local credentials and
Vercel project state outside source control.
