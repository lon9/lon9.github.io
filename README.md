# lon9.github.io

lon9's engineer portfolio — built with Next.js 15, React 19, and Tailwind CSS v4. Fetches live GitHub data and deploys as a static site to GitHub Pages.

## Commands

<!-- AUTO-GENERATED -->
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build static export to `./out` |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint |
<!-- AUTO-GENERATED -->

## Environment Variables

<!-- AUTO-GENERATED -->
| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_GITHUB_USERNAME` | Yes | GitHub username to display portfolio for | `lon9` |
<!-- AUTO-GENERATED -->

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

## Development

**Prerequisites:** Node.js 22+, npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Pushes to the `develop` branch trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the static site and publishes `./out` to the `master` branch via `peaceiris/actions-gh-pages`.

The site is served from `https://lon9.github.io`.
