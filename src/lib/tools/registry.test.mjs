import assert from "node:assert/strict";
import { test } from "node:test";

test("published tool modules are resolved by the registry contract", async () => {
  const source = await import("./registry.ts");

  assert.ok(Array.isArray(source.toolRegistry));
  assert.ok(source.toolRegistry.length > 0);

  const ids = source.toolRegistry.map(({ tool }) => tool.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const { tool, module } of source.toolRegistry) {
    assert.equal(tool.available, true);
    assert.equal(tool.slug.length > 0, true);
    assert.equal(typeof module.load, "function");
  }
});
