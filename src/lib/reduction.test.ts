import test from "node:test";
import assert from "node:assert/strict";
import { isValidDiscountRate, isValidReductionPrice } from "./reduction";

test("reduction accepts positive prices", () => {
  assert.equal(isValidReductionPrice(0.01), true);
  assert.equal(isValidReductionPrice(150), true);
});

test("reduction rejects zero and negative prices", () => {
  assert.equal(isValidReductionPrice(0), false);
  assert.equal(isValidReductionPrice(-1), false);
});

test("reduction discount rate accepts 0% and 100%", () => {
  assert.equal(isValidDiscountRate(0), true);
  assert.equal(isValidDiscountRate(100), true);
});

test("reduction rejects discount rates outside 0-100%", () => {
  assert.equal(isValidDiscountRate(-1), false);
  assert.equal(isValidDiscountRate(101), false);
});
