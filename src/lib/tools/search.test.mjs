import assert from "node:assert/strict";
import { test } from "node:test";
import { tools } from "./tools.ts";
import { searchTools } from "./search.ts";

function ids(query, locale = "fr") {
  return searchTools(tools, query, locale).map(({ tool }) => tool.id);
}

test("matches localized names and ignores accents", () => {
  assert.equal(ids("regle")[0], "regle-de-trois");
  assert.equal(ids("règle")[0], "regle-de-trois");
});

test("matches aliases and keywords", () => {
  assert.equal(ids("bitrate")[0], "taille-fichier");
  assert.equal(ids("internet")[0], "vitesse-telechargement");
});

test("tolerates a small typo in a tool name", () => {
  assert.equal(ids("pourcentge")[0], "pourcentage");
  assert.equal(ids("telechargemnt")[0], "temps-telechargement");
});

test("supports multi-term queries with a typo", () => {
  assert.equal(ids("calculer pourcentge")[0], "pourcentage");
});

test("does not fuzzy-match very short terms", () => {
  assert.deepEqual(ids("tvx"), []);
});
