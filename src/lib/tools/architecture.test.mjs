import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { tools } from "./tools.ts";

const toolsRouteRoot = fileURLToPath(new URL("../../app/[locale]/outils", import.meta.url));

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
  const matches = [...source.matchAll(/toolId="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(matches.length, 1, `Tool page ${file} must declare exactly one ToolPage toolId.`);
  return matches[0];
}

test("published tools have exactly one canonical App Router page", async () => {
  const pageFiles = await collectPageFiles(toolsRouteRoot);
  const pageEntries = await Promise.all(
    pageFiles.map(async (file) => ({
      file,
      source: await readFile(file, "utf8"),
    })),
  );

  const routeToolIds = pageEntries.map(({ file, source }) => extractToolId(source, file));
  const routeIds = new Set(routeToolIds);
  assert.equal(routeIds.size, routeToolIds.length, "A tool must not have multiple canonical tool pages.");

  const publishedIds = tools.filter((tool) => tool.lifecycle === "published").map((tool) => tool.id);
  assert.deepEqual([...routeIds].sort(), [...publishedIds].sort());
});

test("canonical tool pages reference known published tools", async () => {
  const pageFiles = await collectPageFiles(toolsRouteRoot);
  const knownPublishedIds = new Set(
    tools.filter((tool) => tool.lifecycle === "published").map((tool) => tool.id),
  );

  for (const file of pageFiles) {
    const source = await readFile(file, "utf8");
    const toolId = extractToolId(source, file);
    assert.ok(knownPublishedIds.has(toolId), `Tool page ${file} references non-published tool "${toolId}".`);
    assert.match(source, /<ToolPage\b/, `Tool page ${file} must use the shared ToolPage shell.`);
  }
});
