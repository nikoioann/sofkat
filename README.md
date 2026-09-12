# Sofoklis & Katerina

Static wedding site built with [Next.js](https://nextjs.org), deployed to GitHub Pages
at **https://nikoioann.github.io/sofkat**.

## Getting Started

```bash
npm install
npm run dev
```

The dev server also runs under the `/sofkat` base path, so open
[http://localhost:3000/sofkat](http://localhost:3000/sofkat).

Set `NEXT_PUBLIC_GOOGLE_MAP_API` in `.env` for the map to load.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs
`npm run build` and publishes the exported `out/` directory to GitHub Pages.

One-time repository setup:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions →** add `NEXT_PUBLIC_GOOGLE_MAP_API`.

To deploy by hand instead: `npm run deploy` (pushes `out/` to the `gh-pages` branch
via the `gh-pages` package).

### Static-site constraints

The site is a full static export (`output: "export"`), so there is no server at
runtime — no API routes, no server actions, no on-demand file writes.

- **Base path.** The site lives at `/sofkat`. `next/link`, `next/image` and
  `next/font` handle that prefix automatically; anything referenced by a plain
  `<img>`, `<video>` or CSS `url()` must be wrapped in `asset()` from
  `lib/basePath.js`. Serving from a domain root instead? Build with
  `NEXT_PUBLIC_BASE_PATH=""`.
- **The shared album is read-only.** `app/photos/page.js` lists whatever media is
  committed under `public/uploads/` *at build time*. To add photos or videos,
  commit the files to `public/uploads/` and push — the deploy workflow rebuilds
  the gallery. Guest uploads would need a hosted backend (Cloudinary, S3, a
  Google Form, etc.); they cannot run on GitHub Pages.
