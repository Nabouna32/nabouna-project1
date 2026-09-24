# Utiluna — Tool Architecture

## Model

Utiluna supports three levels: small tools, advanced tools, and mini-applications. All share a common platform contract while retaining tool-specific UX and visual identity.

## Contract

A tool should declare identity, slug, localized content, complexity, version, categories, centrally managed tags and aliases, SEO metadata, examples, processing/privacy classification, capabilities, browser requirements, offline capability, sharing/state behavior, related tools, accessibility/performance expectations, lifecycle state and contributor attribution.

## UX contract

Tool pages prioritize inputs, result, actions, explanation, then documentation. Inputs should prevent impossible values where practical. Errors are clear and actionable. Reset is systematic. Sharing may represent a blank tool, configured state, or result/state when safe.

## Capabilities

Capabilities can include local processing, file input, clipboard, camera, microphone, geolocation, external network, account data and server/database access. Access must be explicit and enforceable.

## Processing

Every tool identifies local, external-service, Utiluna-server or hybrid processing and explains what data is transmitted, where and why.

## Heavy tools

Use Web Workers, WebAssembly, chunking and streaming when justified. Simple tools must not inherit heavy infrastructure merely for consistency.
