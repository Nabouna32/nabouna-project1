# Utiluna — Current Status

## Current state

- UX V2 foundations through the homepage exploration cue are merged on `main`.
- Main uses the generic ToolPage shell and semantic processing/result status metadata.
- The tool platform audit identified route duplication, fragmented tool metadata, and the need for a first-class module registry.
- The registry-based dynamic route is merged on `main`; the current platform work continues on runtime capability enforcement.

## Recently completed

- Merged homepage search/stacking and exploration-cue UX work.
- Merged the registry-based dynamic tool route and removed per-tool App Router page duplication.
- Confirmed the processing/access/capabilities concerns are separate architectural axes.
- Confirmed the database should eventually hold dynamic/editorial/product catalog data, while executable tool behavior remains in code.
- Introduced the first tool-scoped runtime capability boundary: clipboard access is now declared and enforced through the ToolPage runtime.
- ToolPage now receives the already-resolved registry tool instead of resolving the catalog a second time.

## Current architectural work

### In progress

- Strengthen the Tool contract and runtime boundary around capabilities and access.
- Extend runtime-backed capabilities beyond clipboard as real platform needs appear.
- Keep registry coverage and architecture tests aligned with the module contract.

### Not implemented yet

- Supabase/database integration.
- Admin panel.
- Account/premium enforcement.
- Runtime capability enforcement.
- Generic sharing runtime.
- Database-backed catalog/editorial content.

## Important boundary

The code/module remains authoritative for executable behavior and technical capabilities. A future database may own editable product metadata, publishing, editorial content and admin-managed catalog fields, but it must not be allowed to falsely redefine what a module technically does.

## Next actions

1. Complete the module/runtime contract audit, including capability coverage and access enforcement boundaries.
2. Audit URL state, sharing, SEO, local persistence and external-service boundaries.
3. Define the code/database boundary and schema before introducing Supabase.
4. Audit editorial/catalog ownership and i18n scalability for a 1,000+ tool catalog.
5. Resume the UX audit after the platform foundation is stable, including the processing-status badge and above-the-fold tool hierarchy.
