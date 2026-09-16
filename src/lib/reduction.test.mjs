import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateDiscountAmount,
  calculateDiscountedPrice,
  isValidDiscountRate,
} from "./reduction.ts";

test("calculates the discount amount", () => {
  assert.equal(calculateDiscountAmount(150, 20), 30);
});

test("calculates the discounted price", () => {
  assert.equal(calculateDiscountedPrice(150, 20), 120);
});

test("supports decimal prices and rates", () => {
  assert.equal(calculateDiscountAmount(99.9, 12.5), 12.4875);
  assert.equal(calculateDiscountedPrice(99.9, 12.5), 87.4125);
});

test("validates discount rates between 0 and 100", () => {
  assert.equal(isValidDiscountRate(0), true);
  assert.equal(isValidDiscountRate(100), true);
  assert.equal(isValidDiscountRate(-1), false);
  assert.equal(isValidDiscountRate(100.01), false);
});
