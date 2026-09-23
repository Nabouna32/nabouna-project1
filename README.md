# Utiluna

Utiluna is a lightweight collection of practical, browser-based tools for everyday calculations and conversions.

The project is built with Next.js, React, TypeScript, and Tailwind CSS. It supports French and English routes and is designed around a simple principle: get a useful result quickly, with explanations available when they add value.

## Development

Requirements:

- Node.js 24 LTS
- npm

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Then open http://localhost:3000.

## Validation

The repository uses GitHub Actions for continuous validation.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Browser smoke tests can be run with the dedicated Playwright workflow.

## Project structure

- `src/app` — Next.js App Router pages and localized routes
- `src/components` — reusable UI components
- `src/lib` — calculations, tool definitions, search, and i18n
- `e2e` — browser smoke tests
- `.github/workflows` — CI and E2E automation

## Deployment

Production deployment is handled by Vercel from the `main` branch.

Pull requests and feature branches are intentionally not deployed automatically. This keeps Vercel deployment usage focused on production while GitHub Actions remains the CI validation layer.

## Contributing

Changes should be made through pull requests. Keep changes focused, ensure the CI checks pass, and avoid committing secrets or local environment files.

## License

No open-source license has been selected yet. Until a license is added, the repository remains publicly visible but its contents are not automatically granted broad reuse rights.
