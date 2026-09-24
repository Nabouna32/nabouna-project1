import test from "node:test";
import assert from "node:assert/strict";
import { locales, languages } from "../i18n/config.ts";
import { getMessages } from "../i18n/messages.ts";

test("i18n registry exposes the initial languages", () => {
  assert.deepEqual(locales, ["fr", "en"]);
  assert.equal(languages.fr.direction, "ltr");
  assert.equal(languages.en.direction, "ltr");
  assert.equal(languages.fr.enabled, true);
  assert.equal(languages.en.enabled, true);
});

test("global messages are available in every enabled locale", () => {
  for (const locale of locales) {
    const messages = getMessages(locale);
    assert.ok(messages.nav.tools.length > 0);
    assert.ok(messages.tools.title.length > 0);
    assert.ok(messages.processing.more.length > 0);
  }
});
