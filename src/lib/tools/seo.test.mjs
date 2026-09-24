import assert from "node:assert/strict";
import { test } from "node:test";
import { getToolSeo } from "./seo.ts";
import { toolSeo } from "./seo.ts";

test("published tools expose SEO metadata in every enabled locale", () => {
  for (const toolId of Object.keys(toolSeo)) {
    for (const locale of ["fr", "en"] as const) {
      const seo = getToolSeo(toolId, locale);
      assert.ok(seo.title.trim().length > 0);
      assert.ok(seo.description.trim().length > 0);
    }
  }
});

test("published tool SEO metadata is localized", () => {
  for (const toolId of Object.keys(toolSeo)) {
    assert.notEqual(getToolSeo(toolId, "fr").title, getToolSeo(toolId, "en").title);
    assert.notEqual(getToolSeo(toolId, "fr").description, getToolSeo(toolId, "en").description);
  }
});
