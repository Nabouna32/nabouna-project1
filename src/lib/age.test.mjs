import assert from "node:assert/strict";
import test from "node:test";
import { calculateAge } from "./age.ts";

function date(value) {
  return new Date(`${value}T12:00:00`);
}

test("calculates years, months and days", () => {
  assert.deepEqual(calculateAge(date("2000-01-15"), date("2026-09-17")), {
    years: 26,
    months: 8,
    days: 2,
  });
});

test("handles a birthday exactly", () => {
  assert.deepEqual(calculateAge(date("2000-09-17"), date("2026-09-17")), {
    years: 26,
    months: 0,
    days: 0,
  });
});

test("returns null when the birth date is after the reference date", () => {
  assert.equal(calculateAge(date("2026-09-18"), date("2026-09-17")), null);
});
