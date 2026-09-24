# Utiluna

**Utiluna is a universal browser-based toolbox: a large, organized collection of useful tools designed to make small digital tasks fast, understandable, visual, and pleasant.**

The product is intentionally broader than calculators and converters. The long-term catalog may include practical, technical, creative, visual, educational, analytical, playful, emotional, symbolic, and other browser-realizable tools.

## Product direction

Utiluna follows a few core principles:

- **Browser-first / local-first:** when possible, processing happens directly on the user's device.
- **Transparent processing:** tools clearly explain whether data stays local, is sent to an external service, or requires Utiluna infrastructure.
- **Simple by default:** users should get the result without learning the product.
- **Powerful when needed:** advanced tools and detailed explanations remain available.
- **Visual when useful:** results can be graphical, interactive, or animated when that improves understanding or enjoyment.
- **Sober or playful:** users can choose a restrained or more expressive interaction style.
- **Free and sustainable:** advertising may fund the service without obstructing the primary task.
- **Anonymous-first:** accounts are optional and add personalization/synchronization rather than gating core tools.

See the product documentation for the complete direction:

- [Vision](docs/VISION.md)
- [Product definition](docs/PRODUCT.md)
- [UX specification](docs/UX.md)
- [Architecture direction](docs/ARCHITECTURE.md)
- [Privacy principles](docs/PRIVACY.md)
- [Roadmap](docs/ROADMAP.md)
- [Decisions](docs/DECISIONS.md)
- [Tool architecture](docs/TOOL_ARCHITECTURE.md)
- [Tool quality contract](docs/TOOL_QUALITY.md)
- [Database](docs/DATABASE.md)
- [Search](docs/SEARCH.md)
- [Internationalization](docs/I18N.md)
- [Accessibility](docs/ACCESSIBILITY.md)
- [Performance](docs/PERFORMANCE.md)
- [SEO](docs/SEO.md)
- [Analytics](docs/ANALYTICS.md)
- [Monetization](docs/MONETIZATION.md)
- [Community](docs/COMMUNITY.md)
- [Admin](docs/ADMIN.md)
- [Discussions / future](docs/DISCUSSIONS.md)

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

Browser smoke tests use Playwright and run through GitHub Actions.

## Project structure

- `src/app` — Next.js App Router pages and localized routes
- `src/components` — reusable UI components
- `src/lib` — calculations, tool definitions, search, and i18n
- `e2e` — browser smoke tests
- `docs` — product, UX, architecture, privacy, roadmap, and decision documentation
- `.github/workflows` — CI and E2E automation

## Deployment

Production deployment is handled by Vercel from the `main` branch.

Pull requests and feature branches are intentionally not deployed automatically. This keeps Vercel deployment usage focused on production while GitHub Actions remains the CI validation layer.

## Contributing

Changes should be made through pull requests. Keep changes focused, ensure the CI checks pass, and avoid committing secrets or local environment files.

Before changing product behavior or architecture, consult the documentation in `docs/` and update the relevant decision/documentation when the change is durable.

## License

No open-source license has been selected yet. The repository is publicly visible, but its contents are not automatically granted broad reuse rights.
