# Utiluna — Architecture Direction

## Status

This document defines the architectural direction from the current product discovery phase. It intentionally separates firm product constraints from implementation details that remain open.

## Primary architecture principle

**Browser-first processing.**

Whenever a useful operation can reasonably run in the browser, the browser should perform it.

The server is not intended to become a general-purpose file-processing backend.

## Responsibility split

### Browser

Preferred location for:

- calculations;
- conversions;
- text processing;
- local file transformations;
- image processing;
- client-side visualization;
- interactive simulations;
- random generators;
- local history;
- anonymous preferences;
- other operations that can safely run locally.

### Backend / hosted services

Appropriate for:

- authentication;
- synchronized user metadata;
- favorites and collections;
- account preferences;
- optional synchronized history;
- catalog metadata when beneficial;
- community features;
- moderation;
- lightweight analytics;
- selected external API orchestration;
- operations that genuinely require a server.

### External APIs

Allowed when they provide meaningful capabilities that cannot reasonably be provided locally.

Examples may include:

- live weather;
- public data;
- exchange rates;
- selected enrichment;
- future AI-assisted search.

External services must be explicit in the tool's processing-status metadata.

## File handling

Large file uploads/downloads through Utiluna infrastructure are intentionally avoided as a default architecture.

If a file operation can be performed locally, the preferred flow is:

> User device → browser → local processing → result

No Utiluna upload is required.

A server-side file workflow requires explicit product justification because it affects:

- infrastructure cost;
- bandwidth;
- privacy;
- abuse surface;
- reliability;
- operational complexity.

## Tool platform

The long-term platform should treat tools as first-class domain objects rather than unrelated pages.

A conceptual tool definition may contain:

- stable identifier;
- display name;
- description;
- category;
- tags;
- search aliases;
- localization keys;
- icon/visual metadata;
- processing mode;
- external dependencies;
- capabilities;
- SEO metadata;
- related tools;
- documentation;
- contribution attribution;
- validation/test metadata.

The exact schema is not frozen yet.

## Tool implementations

The platform must allow diversity.

A shared tool contract should standardize infrastructure concerns without requiring every tool to share the same UI.

Possible implementation classes include:

- simple deterministic calculators;
- structured form tools;
- visual generators;
- interactive editors;
- local file processors;
- simulations;
- API-backed tools;
- future AI-assisted tools.

## Tool definitions vs custom experiences

A structured definition system is encouraged for tools whose behavior can be represented safely and clearly.

However, it must not become a lowest-common-denominator renderer.

A tool may opt into a custom implementation when it needs:

- unique visualization;
- complex interaction;
- custom animation;
- specialized processing;
- non-standard layout.

The platform should make custom tools first-class rather than treating them as hacks.

## Privacy model

The architecture should expose processing location as explicit metadata.

A tool should declare whether it is:

- local-only;
- external-service backed;
- server-backed;
- hybrid.

This metadata can drive:

- UI indicators;
- privacy details;
- search filters;
- documentation;
- auditing.

## State model

Use local browser state where account synchronization is unnecessary.

Candidate local storage layers include:

- localStorage for small preferences;
- IndexedDB for larger structured local state.

The final choice should be based on the actual data requirements.

Account-backed state should store metadata rather than raw sensitive tool content by default.

## Search architecture

Search should be designed as a first-class system rather than a simple text filter.

The catalog should support:

- exact names;
- aliases;
- descriptions;
- categories;
- tags;
- localization;
- intent signals;
- related tools.

An intent layer may later map natural-language requests to tools.

AI can be added behind the search abstraction if its value justifies cost and privacy trade-offs.

## Authentication

Authentication should support popular providers in addition to a low-friction account option.

Initial provider selection remains an implementation decision.

Anonymous usage is mandatory for core functionality.

## Database

A database is expected to become useful for:

- users;
- favorites;
- collections;
- synchronized preferences;
- community proposals;
- ratings;
- comments;
- moderation state;
- tool metadata where appropriate;
- privacy-conscious analytics data.

The initial database technology and hosting provider remain open until the implementation requirements are sufficiently known.

A small paid database/infrastructure budget is acceptable once product revenue or traffic justifies it.

## Community architecture

Community functionality should be isolated enough that it cannot compromise the core tool experience.

Potential entities:

- tool proposal;
- contribution;
- rating;
- comment;
- moderation action;
- contributor attribution.

All user-generated content requires validation/moderation.

## Analytics architecture

Analytics should measure product behavior without collecting tool input content by default.

The system should be capable of answering questions such as:

- Which tools are used?
- Which searches produce no useful result?
- Which tools have poor engagement?
- Which categories are growing?
- Where are technical failures occurring?

The exact provider is not decided yet.

## Technology baseline

The current repository uses:

- Next.js App Router;
- React;
- TypeScript;
- Tailwind CSS;
- Vercel for production hosting;
- GitHub Actions for CI;
- Playwright for browser-level validation.

This is the current baseline, not an immutable commitment.

Any major technology change must be justified against the product's browser-first, SEO, performance, maintainability, and cost requirements.

## Future Android client

The web platform remains primary.

Tool/domain logic should be separated from browser-specific infrastructure when doing so is inexpensive and useful, but the architecture must not introduce abstractions solely for a hypothetical future mobile client.
