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
    nameByLocale: { fr: "Calculateur de durée", en: "Duration Calculator" },
    descriptionByLocale: { fr: "Calculez la durée entre deux dates.", en: "Calculate the duration between two dates." },
    keywordsByLocale: { fr: ["temps", "intervalle"], en: ["time", "interval"] },
    available: true,
  },
  {
    id: "tva",
    slug: "tva",
    categoryId: "calculs",
    icon: "💶",
    name: "Calculateur TVA HT / TTC",
    description: "Convertissez un prix HT en TTC.",
    keywords: ["taxe", "prix"],
    nameByLocale: { fr: "Calculateur TVA HT / TTC", en: "VAT Calculator" },
    descriptionByLocale: { fr: "Convertissez un prix HT en TTC.", en: "Convert a price between excluding and including VAT." },
    keywordsByLocale: { fr: ["taxe", "prix"], en: ["tax", "price", "vat"] },
    available: true,
  },
  {
    id: "internet",
    slug: "internet",
    categoryId: "informatique",
    icon: "🚀",
    name: "Mbps ↔ Mo/s",
    description: "Convertissez une vitesse Internet.",
    keywords: ["débit", "connexion"],
    nameByLocale: { fr: "Mbps ↔ Mo/s", en: "Mbps ↔ MB/s Converter" },
    descriptionByLocale: { fr: "Convertissez une vitesse Internet.", en: "Convert an Internet speed." },
    keywordsByLocale: { fr: ["débit", "connexion"], en: ["speed", "connection"] },
    available: true,
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

test("search uses the selected locale", () => {
  assert.equal(searchTools(tools, "duration", "en")[0].tool.id, "duree");
  assert.equal(searchTools(tools, "VAT", "en")[0].tool.id, "tva");
  assert.equal(searchTools(tools, "speed", "en")[0].tool.id, "internet");
  assert.equal(searchTools(tools, "durée", "en").length, 0);
});

test("empty search returns no suggestions", () => {
  assert.deepEqual(searchTools(tools, "   "), []);
});
