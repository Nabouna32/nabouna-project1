import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const toolsRouteRoot = fileURLToPath(new URL("../../app/[locale]/outils", import.meta.url));
const toolsCatalogFile = fileURLToPath(new URL("./tools.ts", import.meta.url));

async function collectPageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectPageFiles(path)));
    else if (entry.isFile() && entry.name === "page.tsx") files.push(path);
  }
  return files;
}

function extractToolId(source, file) {
  const toolPageTags = [...source.matchAll(/<ToolPage\b[^>]*>/g)];
  assert.equal(toolPageTags.length, 1, `Tool page ${file} must declare exactly one ToolPage shell.`);
  const match = toolPageTags[0][0].match(/\\btoolId="([^"]+)"/);
  assert.ok(match, `Tool page ${file} must declare a ToolPage toolId.`);
  return match[1];
}

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

async function collectCanonicalToolPages() {
  const pageFiles = await collectPageFiles(toolsRouteRoot);
  const pageEntries = await Promise.all(
    pageFiles.map(async (file) => ({
      file,
      source: await readFile(file, "utf8"),
    })),
  );
  return pageEntries.filter(({ source }) => /<ToolPage\b/.test(source));
}

test("published tools have exactly one canonical App Router page", async () => {
  const pageEntries = await collectCanonicalToolPages();
  const routeToolIds = pageEntries.map(({ file, source }) => extractToolId(source, file));
  const routeIds = new Set(routeToolIds);
  assert.equal(routeIds.size, routeToolIds.length, "A tool must not have multiple canonical tool pages.");

  const publishedIds = await readPublishedToolIds();
  assert.deepEqual([...routeIds].sort(), [...publishedIds].sort());
});

test("canonical tool pages reference known published tools", async () => {
  const pageEntries = await collectCanonicalToolPages();
  const knownPublishedIds = new Set(await readPublishedToolIds());

  for (const { file, source } of pageEntries) {
    const toolId = extractToolId(source, file);
    assert.ok(knownPublishedIds.has(toolId), `Tool page ${file} references non-published tool "${toolId}".`);
  }
});
