import assert from "node:assert/strict";
import test from "node:test";
import { calculateDateDuration, calculateTimeDuration } from "./duree.ts";

function dateTime(value) {
  return new Date(value);
}

test("calculates duration between dates and times", () => {
  assert.deepEqual(
    calculateDateDuration(dateTime("2026-01-01T08:15:00"), dateTime("2026-01-03T10:45:00")),
    { days: 2, hours: 2, minutes: 30 },
  );
});

test("calculates a duration with minutes on the same date", () => {
  assert.deepEqual(
    calculateDateDuration(dateTime("2026-01-01T08:15:00"), dateTime("2026-01-01T10:45:00")),
    { days: 0, hours: 2, minutes: 30 },
  );
});

test("rejects a date and time range in reverse order", () => {
  assert.equal(
    calculateDateDuration(dateTime("2026-01-03T10:00:00"), dateTime("2026-01-03T09:00:00")),
    null,
  );
});

test("calculates duration between times", () => {
  assert.deepEqual(calculateTimeDuration("08:15", "10:45"), {
    days: 0,
    hours: 2,
    minutes: 30,
  });
});

test("handles a time duration crossing midnight", () => {
  assert.deepEqual(calculateTimeDuration("23:30", "01:15"), {
    days: 0,
    hours: 1,
    minutes: 45,
  });
});

test("rejects invalid time values", () => {
  assert.equal(calculateTimeDuration("25:00", "10:00"), null);
});
