# Utiluna — Architecture and Product Decisions

This file records durable decisions and the reasoning behind them. It should be updated when a decision materially changes.

## DEC-001 — Browser-first processing

**Status:** Accepted

### Decision

Prefer browser-side processing whenever a task can reasonably be completed locally.

### Reason

This reduces server bandwidth and storage requirements, improves privacy, and keeps the product viable with a small infrastructure budget.

### Consequences

Some tools will require browser APIs, WebAssembly, client-side libraries, or local browser storage.

Server-side processing remains available when genuinely necessary.

---

## DEC-002 — Anonymous-first usage

**Status:** Accepted

### Decision

Core tools must work without an account.

### Reason

Utiluna is a utility site. Requiring registration before a simple calculation would add unnecessary friction.

### Consequences

Local browser state can provide history and preferences before authentication.

Accounts add synchronization and personalization rather than basic access.

---

## DEC-003 — Transparent processing status

**Status:** Accepted

### Decision

Every tool should clearly expose where processing occurs and whether data is transmitted externally.

### Reason

Local-first architecture is only valuable to users if they can understand it.

### Consequences

Processing classification becomes part of tool metadata and UI.

---

## DEC-004 — Tool diversity is allowed

**Status:** Accepted

### Decision

A shared platform contract must not force all tools to use the same visual interaction.

### Reason

Utiluna's value includes visual, interactive, playful, and specialized experiences.

### Consequences

The platform standardizes infrastructure and trust requirements, while custom tool UIs remain first-class.

---

## DEC-005 — Sober and playful modes

**Status:** Accepted

### Decision

Provide a user-selectable sober/playful presentation style.

### Reason

Some users want maximum efficiency; others enjoy richer interactions. The product should support both without forcing either style.

### Consequences

Animations and visual effects must remain accessible and must respect reduced-motion preferences.

---

## DEC-006 — Advertising must remain subordinate

**Status:** Accepted

### Decision

Advertising can fund the free product, but it must not obstruct the primary tool experience.

### Reason

The product needs a sustainable business model without undermining the reason users visit it.

### Consequences

Desktop side placements are preferred where space permits. Alternative placements may be used on smaller screens.

---

## DEC-007 — Optional community

**Status:** Accepted as future direction

### Decision

A moderated community layer may allow tool proposals, ideas, ratings, comments, and contributor attribution.

### Reason

User participation can improve discovery and give the catalog a living, interactive character.

### Consequences

A database, moderation workflow, abuse controls, and contribution metadata will eventually be required.

---

## DEC-008 — AI is conditional, not foundational

**Status:** Accepted

### Decision

AI may be used for search/intention assistance if it creates enough value to justify cost, latency, privacy, and reliability trade-offs.

### Reason

AI is useful but recurring external API costs and data handling must be justified.

### Consequences

Search architecture should allow an intelligence layer without requiring one from day one.

---

## DEC-009 — Current web stack remains the baseline

**Status:** Accepted provisionally

### Decision

Continue with Next.js, React, TypeScript, Tailwind CSS, Vercel, GitHub Actions, and Playwright unless implementation evidence justifies a change.

### Reason

The existing stack supports the current product requirements and avoids unnecessary migration work.

### Consequences

Architecture should be designed around product requirements rather than framework assumptions.

---

## DEC-010 — Tech lead / product owner autonomy

**Status:** Accepted

### Decision

The project grants the technical lead/product owner authority to make routine, reversible technical, UX, and low-impact product decisions without asking for approval.

### Consult the user when

A decision materially affects:

- fundamental product direction;
- long-term cost;
- user data handling;
- legal/compliance exposure;
- business model;
- irreversible public commitments.

### Reason

This allows the project to move quickly while preserving user control over consequential decisions.


---

## DEC-011 — Privacy is a product feature

**Status:** Accepted

### Decision

Privacy and transparency are first-class product requirements, not merely compliance documentation.

### Principles

- collect the minimum necessary data;
- prefer local processing;
- never request data a tool does not need;
- disclose every meaningful data transfer;
- provide understandable privacy details;
- provide a transparency/data dashboard for authenticated users;
- support export;
- support account deletion with deletion or strong anonymization where deletion is impossible;
- make non-essential consent refusal easy;
- treat imported and client-provided data as untrusted.

### Reason

Users should be able to understand and control their relationship with Utiluna instead of being forced to trust an opaque system.

---

## DEC-012 — Simple consent choices

**Status:** Accepted

### Decision

Consent UX must make refusal of non-essential tracking as easy as acceptance.

### Reason

Privacy controls should not become a maze of partner-by-partner decisions.

### Consequences

Utiluna should provide clear high-level choices such as accept, refuse non-essential tracking, or customize, while retaining the granular controls required by the actual legal/provider setup.

---

## DEC-013 — Capability-based tool permissions

**Status:** Accepted

### Decision

Tools must explicitly declare and receive only the browser, network, account-data, and server capabilities they require.

### Reason

A universal toolbox will eventually contain many independent implementations. Capability boundaries reduce accidental data access and limit the impact of a compromised or defective tool.

### Consequences

The Tool contract must include capabilities. Tool execution architecture should enforce these boundaries rather than relying only on developer discipline.

---

## DEC-014 — External integrations are catalogued

**Status:** Accepted

### Decision

Every external API/provider integration must be documented in a traceable catalog.

### Reason

External dependencies affect privacy, cost, availability, security, and user trust.

### Consequences

The catalog must include provider, domain, purpose, transmitted data, authentication model, policy reference, cost/quota, fallback behavior, and ownership.

---

## DEC-015 — User data transparency dashboard

**Status:** Accepted as product direction

### Decision

Authenticated users should have a dedicated dashboard showing the data Utiluna stores or associates with their account and the relevant privacy/consent choices.

### Reason

Users should not need to navigate obscure settings or infer what is stored.

### Consequences

The data model must maintain clear ownership and deletion/export boundaries across identity, preferences, product data, community content, analytics, and security/moderation records.
