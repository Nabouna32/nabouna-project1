import assert from "node:assert/strict";
import { test } from "node:test";
import { validateToolCatalog } from "./metadata.ts";

const tool = {
  id: "fixture",
  slug: "fixture",
  categoryId: "calculs",
  icon: "🧮",
  name: "Fixture",
  description: "Fixture",
  available: true,
  version: 1,
  complexity: "small",
  categories: ["calculs"],
  content: { fr: { name: "Fixture", description: "Fixture" } },
  tags: ["fixture"],
  aliases: ["test"],
  seo: {
    fr: { title: "Fixture", description: "Fixture" },
    en: { title: "Fixture", description: "Fixture" },
  },
  examples: [],
  processing: {
    mode: "local",
    dataCategories: [],
    externalProviders: [],
    storage: "none",
    retention: "none",
    fallback: "local",
  },
  capabilities: ["local-processing"],
  browserRequirements: { apis: [] },
  offline: true,
  sharing: { supported: false, mode: "none" },
  relatedToolIds: [],
  quality: { accessibility: "required", performance: "standard", tests: "required" },
  lifecycle: "published",
  contributor: { type: "internal" },
};

test("the metadata validator accepts a valid local tool", () => {
  assert.doesNotThrow(() => validateToolCatalog([tool]));
});

test("the metadata validator rejects duplicate ids and slugs", () => {
  assert.throws(
    () => validateToolCatalog([tool, { ...tool }]),
    /Duplicate tool id/,
  );
});

test("the metadata validator rejects broken relationships", () => {
  assert.throws(
    () => validateToolCatalog([{ ...tool, relatedToolIds: ["missing-tool"] }]),
    /unknown related tool/,
  );
});

test("the metadata validator rejects incompatible local storage", () => {
  assert.throws(
    () =>
      validateToolCatalog([
        {
          ...tool,
          processing: { ...tool.processing, storage: "utiluna" },
        },
      ]),
    /incompatible storage metadata/,
  );
});
