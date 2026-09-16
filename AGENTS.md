<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Utiluna development rules

## Source of truth

- The GitHub repository `Nabouna32/utiluna` is the source of truth for the application code.
- Always inspect the current repository state before making a significant change. Do not rely on an older copied version of a file.
- Keep `main` deployable and stable.

## Development loop

For significant changes, follow this loop:

1. Understand the objective and current implementation.
2. Make the smallest coherent change that solves the problem.
3. Run the relevant validation immediately.
4. Fix failures and rerun validation.
5. Check for regressions before considering the change complete.
6. Commit at a stable milestone.

Avoid accumulating unrelated, untested changes.

## Validation

The repository uses GitHub Actions as the baseline CI gate. The CI workflow runs on pushes to `main` and pull requests targeting `main` and currently validates:

- `npm ci`
- `npm run lint`
- `npm run build`

A successful local build is useful but does not replace checking the resulting Vercel deployment when a change affects runtime or UI behavior.

For UI changes, use browser verification when practical and inspect the deployed preview/production result when relevant.

A pull request is not considered ready to merge while its required validation is failing. Do not merge known-broken work into `main` merely to unblock another change.

Prefer short-lived, coherent pull requests. Merge stable work regularly rather than allowing many long-lived branches to accumulate. When branches overlap or fall behind `main`, update the branch and resolve conflicts before merging so integration problems are handled early.

For larger or risky changes, the preferred path is:

1. implement on a dedicated branch;
2. validate locally;
3. validate the GitHub Actions checks;
4. validate the Vercel preview;
5. perform browser/functional verification when relevant;
6. merge into `main` only once the change is coherent and validated;
7. verify the resulting production deployment when applicable.

## Developer complexity vs user simplicity

- Complexity is acceptable on the development side when it provides useful automation, diagnostics, testing, observability, safety, or maintenance capabilities.
- Prefer a powerful and well-automated developer cockpit when it materially improves reliability or productivity, even if the internal tooling becomes sophisticated.
- Do not expose that internal complexity to end users unnecessarily.
- The final user experience should remain clean, simple, understandable, and focused on the user's task.
- When choosing between two technically sound solutions, prefer the one that hides implementation complexity behind a simple user-facing experience.

## Next.js

- This is a Next.js App Router project. Follow the current Next.js guidance installed in `node_modules/next/dist/docs/` rather than relying on outdated conventions.
- Preserve the generated Next.js agent-rules block at the top of this file.
- Keep the existing TypeScript path alias `@/*` aligned with `src/*` unless there is a deliberate architectural reason to change it.

## Product and UX decisions

- Prefer simple, maintainable user-facing solutions over unnecessary product abstraction.
- Internal developer tooling may be significantly more sophisticated when that complexity remains hidden from users and provides practical value.
- If an idea is clearly useful and low-risk, validate it in the product rather than leaving it as an untracked suggestion.
- Every proposed improvement must end in an explicit decision: implement now, modify before implementation, reject with a reason, or deliberately defer with a reason.
- Do not introduce product behavior solely to satisfy a technical preference; consider the user experience and maintainability together.

## Naming and future renames

- The product name `Utiluna` may change in the future. Avoid unnecessary hard-coded coupling to the display name when introducing new architecture.
- When renaming, search the repository systematically for product-name references before changing identifiers, metadata, deployment settings, or public URLs.

## Security

- Never commit API keys, tokens, passwords, private credentials, `.env` files containing secrets, or other confidential values.
- Use GitHub/Vercel environment variables and secrets for sensitive configuration.
