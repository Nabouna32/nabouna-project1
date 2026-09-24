# Utiluna — Database

PostgreSQL is the planned relational source of truth for durable product, account and community data. Executable behavior remains in Git; business metadata and operational state live in the database.

Expected domains include users/auth identities, preferences, languages/translations, tools and versions, lifecycle state, categories/tags, examples/SEO content, favorites, collections, history metadata, ratings, comments, reports, moderation, proposals, contributors, permissions, audit logs, analytics metadata and privacy/consent state.

Sensitive tool inputs and file contents are not stored by default. Each tool defines what history can retain. Anonymous local favorites may be merged into account favorites after login with deterministic conflict handling.

All client-provided data is untrusted. Enforce server-side validation, authorization, constraints, uniqueness and auditability.

Tool lifecycle: draft → review → published → hidden → archived. Hard deletion is exceptional and protected.
