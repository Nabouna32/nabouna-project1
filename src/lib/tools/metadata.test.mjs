import assert from "node:assert/strict";
import { test } from "node:test";
import { tools } from "./tools.ts";
import { validateToolCatalog } from "./metadata.ts";

test("the production tool catalog satisfies the metadata contract", () => {
  assert.doesNotThrow(() => validateToolCatalog(tools));
  assert.ok(tools.every((tool) => tool.processing.mode));
  assert.ok(tools.every((tool) => tool.capabilities.length > 0));
  assert.ok(tools.every((tool) => tool.categories.length > 0));
  assert.ok(tools.every((tool) => tool.content.fr.name.length > 0));
});

test("the metadata validator rejects broken relationships", () => {
  const broken = [{ ...tools[0], relatedToolIds: ["missing-tool"] }];
  assert.throws(() => validateToolCatalog(broken), /unknown related tool/);
});

test("unavailable tools are not published", () => {
  assert.ok(tools.filter((tool) => !tool.available).every((tool) => tool.lifecycle === "draft"));
});
