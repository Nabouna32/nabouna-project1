import assert from "node:assert/strict";
import { test } from "node:test";

import { searchTools } from "./search.ts";

const tools = [
  {
    id: "duree",
    slug: "duree",
    categoryId: "dates",
    icon: "⏱️",
    name: "Calculateur de durée",
    description: "Calculez la durée entre deux dates.",
    keywords: ["temps", "intervalle"],
  },
  {
    id: "tva",
    slug: "tva",
    categoryId: "calculs",
    icon: "💶",
    name: "Calculateur TVA HT / TTC",
    description: "Convertissez un prix HT en TTC.",
    keywords: ["taxe", "prix"],
  },
  {
    id: "internet",
    slug: "internet",
    categoryId: "informatique",
    icon: "🚀",
    name: "Mbps ↔ Mo/s",
    description: "Convertissez une vitesse Internet.",
    keywords: ["débit", "connexion"],
  },
];

test("search is case and accent insensitive", () => {
  assert.equal(searchTools(tools, "DUREE")[0].tool.id, "duree");
  assert.equal(searchTools(tools, "duree")[0].tool.id, "duree");
});

test("search matches aliases and ranks exact intent", () => {
  assert.equal(searchTools(tools, "taxe")[0].tool.id, "tva");
  assert.equal(searchTools(tools, "connexion")[0].tool.id, "internet");
});

test("empty search returns no suggestions", () => {
  assert.deepEqual(searchTools(tools, "   "), []);
});
