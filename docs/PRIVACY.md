# Utiluna — Privacy and Processing Principles

## Goal

Utiluna should be transparent about what happens to user data.

The product's default position is:

> **If a tool can process data locally, keep the data local.**

## Processing classifications

Every tool should eventually declare one of these classifications:

### Local

All relevant processing occurs on the user's device.

User-facing message:

> 🔒 **Vos données restent sur votre appareil.**

### External

The browser sends selected data to an external provider.

The tool must explain:

- provider;
- data transmitted;
- purpose;
- storage/retention information when known;
- relevant service dependency.

### Utiluna server

The operation requires Utiluna infrastructure.

The same transparency requirements apply.

### Hybrid

Part of the operation occurs locally and part through a remote service.

The boundary must be clearly described.

## Privacy detail view

The short status indicator should link to a tooltip, expandable explanation, or dedicated privacy/processing page.

The detailed view should answer:

1. Where is the processing performed?
2. What data leaves the device?
3. Where is it sent?
4. Why is it needed?
5. Is it stored?
6. For how long, if applicable?
7. Which third parties are involved?
8. What happens if the external service is unavailable?

The explanation should be understandable to a normal user, not only to a developer.

## Account data

Possible account data includes:

- identity information required by the authentication provider;
- favorites;
- collections;
- preferences;
- synchronized history metadata;
- community contributions;
- moderation records.

The system should avoid storing raw tool inputs unless a specific feature explicitly requires it.

## Local history

Anonymous history can be stored locally when useful.

Example:

> Recently used: Percentage calculator

This does not require uploading the user's calculation.

## Share URLs

Sharing tool state is useful, but URLs can become a privacy boundary.

Rules:

- never place sensitive raw content into a share URL by default;
- use only necessary, non-sensitive parameters;
- clearly explain when a shareable URL contains user-provided values;
- provide a safe alternative for complex/private content.

## Analytics

Analytics are permitted for product development but must be proportionate.

Do not collect tool input contents as ordinary analytics.

Events should focus on product behavior, for example:

- tool opened;
- search performed;
- search returned no result;
- tool completed;
- error occurred;
- feature used.

The exact event taxonomy and provider remain open.

## External APIs

External APIs are acceptable when useful, but every integration must document:

- provider;
- purpose;
- transmitted fields;
- authentication model;
- quota/cost;
- failure behavior;
- privacy implications.

## Security

Secrets must never be embedded in client-side code.

API keys and private credentials belong in secure environment configuration.

Client-side APIs must be treated as public unless the provider explicitly supports safe public usage.

## Future legal/compliance work

Before broad public launch, privacy/legal documentation should be reviewed against the actual data flows and jurisdictions served.

This document is an engineering/product direction, not a legal privacy notice.
