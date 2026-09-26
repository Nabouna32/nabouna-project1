# Utiluna — Current Status

## Current state

- UX V2 foundations through the homepage exploration cue are merged on `main`.
- Main currently uses the generic ToolPage shell and semantic processing/result status metadata.
- The tool platform audit identified route duplication, fragmented tool metadata, and the need for a first-class module registry.
- A registry-based dynamic tool route is now being implemented on branch `arch/tool-registry-runtime`.

## Recently completed

- Merged homepage search/stacking and exploration-cue UX work.
- Confirmed the processing/access/capabilities concerns are separate architectural axes.
- Confirmed the database should eventually hold dynamic/editorial/product catalog data, while executable tool behavior remains in code.
- Started migration from one App Router page per published tool to a central registry + dynamic route.

## Current architectural work

### In progress

- Central `Tool Registry` mapping tool IDs to independently loadable modules.
- Generic `/[locale]/outils/[category]/[slug]` route.
- Registry coverage and architecture tests.
- Removal of per-tool App Router page duplication.
- Documentation of the registry boundary.

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

1. Finish and verify the registry migration.
2. Audit and strengthen the module/runtime contract, including access and capability enforcement.
3. Audit URL state, sharing, SEO, local persistence and external-service boundaries.
4. Define the code/database boundary and schema before introducing Supabase.
5. Resume the UX audit after the platform foundation is stable, including the processing-status badge and above-the-fold tool hierarchy.
