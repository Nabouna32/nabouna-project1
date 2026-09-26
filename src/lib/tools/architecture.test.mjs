import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const routeFile = fileURLToPath(new URL("../../app/[locale]/outils/[category]/[slug]/page.tsx", import.meta.url));
const registryFile = fileURLToPath(new URL("./registry.ts", import.meta.url));
const toolsCatalogFile = fileURLToPath(new URL("./tools.ts", import.meta.url));
const editorialFile = fileURLToPath(new URL("./editorial.tsx", import.meta.url));

async function readPublishedToolIds() {
  const source = await readFile(toolsCatalogFile, "utf8");
  const ids = [];
  for (const entry of source.split(/\n\s*\{\n/).slice(1)) {
    const id = entry.match(/\bid:\s*"([^"]+)"/)?.[1];
    const available = entry.match(/\bavailable:\s*(true|false)\b/)?.[1];
    if (id && available === "true") ids.push(id);
  }
  assert.ok(ids.length > 0, "The tool catalog must declare at least one published tool.");
  return ids;
}

test("the tool platform exposes one dynamic route", async () => {
  const source = await readFile(routeFile, "utf8");
  assert.match(source, /getToolRegistryEntry/);
  assert.match(source, /generateStaticParams/);
});

test("published tools have exactly one registry module", async () => {
  const registrySource = await readFile(registryFile, "utf8");
  const publishedIds = await readPublishedToolIds();
  const registeredIds = [...registrySource.matchAll(/^\s+(?:"([^"]+)"|([a-z0-9-]+)): \{ load:/gm)].map(
    ([, quotedId, bareId]) => quotedId ?? bareId,
  );

  assert.deepEqual([...registeredIds].sort(), [...publishedIds].sort());
});

test("published tools have editorial documentation", async () => {
  const publishedIds = await readPublishedToolIds();
  const editorialSource = await readFile(editorialFile, "utf8");

  for (const toolId of publishedIds) {
    const matches = editorialSource.match(new RegExp(`case "${toolId}":`, "g")) ?? [];
    assert.equal(matches.length, 1, `Published tool "${toolId}" must have exactly one editorial entry.`);
  }
});
