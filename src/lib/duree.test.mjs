import assert from "node:assert/strict";
import test from "node:test";
import { calculateDateDuration, calculateTimeDuration } from "./duree.ts";

function date(value) {
  return new Date(`${value}T12:00:00`);
}

test("calculates duration between two dates", () => {
  assert.deepEqual(calculateDateDuration(date("2026-01-01"), date("2026-01-03")), {
    days: 2,
    hours: 0,
    minutes: 0,
  });
});

test("calculates a full month and remaining days", () => {
  assert.deepEqual(calculateDateDuration(date("2026-01-01"), date("2026-02-02")), {
    days: 32,
    hours: 0,
    minutes: 0,
  });
});

test("rejects a date range in reverse order", () => {
  assert.equal(calculateDateDuration(date("2026-01-03"), date("2026-01-01")), null);
});

test("calculates duration between times", () => {
  assert.deepEqual(calculateTimeDuration("08:15", "10:45"), {
    days: 0,
    hours: 2,
    minutes: 30,
  });
});

test("handles a duration crossing midnight", () => {
  assert.deepEqual(calculateTimeDuration("23:30", "01:15"), {
    days: 0,
    hours: 1,
    minutes: 45,
  });
});

test("rejects invalid time values", () => {
  assert.equal(calculateTimeDuration("25:00", "10:00"), null);
});
