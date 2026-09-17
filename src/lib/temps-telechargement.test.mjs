import assert from "node:assert/strict";
import test from "node:test";
import { calculateDownloadTime } from "./temps-telechargement.ts";

test("calculates download time from decimal file size and internet speed", () => {
  assert.deepEqual(calculateDownloadTime(1, "go", 100, "mbps"), {
    totalSeconds: 80,
    days: 0,
    hours: 0,
    minutes: 1,
    seconds: 20,
  });
});

test("supports byte-per-second speed units", () => {
  assert.deepEqual(calculateDownloadTime(500, "mo", 10, "mo-s"), {
    totalSeconds: 50,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 50,
  });
});

test("returns zero for a zero-size file", () => {
  assert.deepEqual(calculateDownloadTime(0, "go", 100, "mbps"), {
    totalSeconds: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
});

test("rejects invalid size and speed", () => {
  assert.equal(calculateDownloadTime(-1, "go", 100, "mbps"), null);
  assert.equal(calculateDownloadTime(1, "go", 0, "mbps"), null);
});
