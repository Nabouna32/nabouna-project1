import assert from "node:assert/strict";
import { test } from "node:test";
import { locales } from "@/lib/i18n/config";
import { getToolSeo } from "./seo.ts";
import { tools } from "./tools.ts";

test("published tools expose SEO metadata in every enabled locale", () => {
  for (const tool of tools.filter((item) => item.available)) {
    for (const locale of locales) {
      const seo = getToolSeo(tool.id, locale);
      assert.ok(seo.title.trim().length > 0);
      assert.ok(seo.description.trim().length > 0);
    }
  }
});

test("published tool SEO metadata is localized", () => {
  for (const tool of tools.filter((item) => item.available)) {
    assert.notEqual(getToolSeo(tool.id, "fr").title, getToolSeo(tool.id, "en").title);
    assert.notEqual(getToolSeo(tool.id, "fr").description, getToolSeo(tool.id, "en").description);
  }
});
