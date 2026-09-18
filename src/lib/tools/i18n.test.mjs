import assert from "node:assert/strict";
import { test } from "node:test";

import { getToolDescription, getToolName } from "./i18n.ts";

const tool = {
  id: "demo",
  slug: "demo",
  categoryId: "calculs",
  icon: "🧮",
  name: "Outil de démonstration",
  description: "Description française.",
  nameByLocale: { fr: "Outil de démonstration", en: "Demo Tool" },
  descriptionByLocale: { fr: "Description française.", en: "English description." },
  available: true,
};

test("tool labels use the selected locale", () => {
  assert.equal(getToolName(tool, "fr"), "Outil de démonstration");
  assert.equal(getToolName(tool, "en"), "Demo Tool");
  assert.equal(getToolDescription(tool, "fr"), "Description française.");
  assert.equal(getToolDescription(tool, "en"), "English description.");
});
