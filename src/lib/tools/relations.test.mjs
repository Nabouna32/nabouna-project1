import assert from "node:assert/strict";
import test from "node:test";
import { getRelatedTools } from "./relations.ts";

const tools = [
  {
    id: "pourcentage",
    slug: "pourcentage",
    categoryId: "calculs",
    icon: "📊",
    name: "Calculateur de pourcentage",
    description: "Calculez un pourcentage.",
    keywords: ["prix", "taux"],
    available: true,
  },
  {
    id: "reduction",
    slug: "reduction",
    categoryId: "calculs",
    icon: "🏷️",
    name: "Calculateur de réduction",
    description: "Calculez une remise.",
    keywords: ["prix", "remise"],
    available: true,
  },
  {
    id: "age",
    slug: "age",
    categoryId: "dates",
    icon: "🎂",
    name: "Calculateur d'âge",
    description: "Calculez un âge.",
    keywords: ["date", "naissance"],
    available: true,
  },
  {
    id: "tva",
    slug: "tva",
    categoryId: "calculs",
    icon: "💶",
    name: "Calculateur TVA",
    description: "Calculez une TVA.",
    keywords: ["prix", "taxe"],
    available: false,
  },
];

test("related tools use shared metadata and category", () => {
  const related = getRelatedTools(tools[0], tools);
  assert.equal(related[0].id, "reduction");
});

test("unavailable tools are never returned", () => {
  const related = getRelatedTools(tools[0], tools);
  assert.equal(related.some((tool) => tool.id === "tva"), false);
});
