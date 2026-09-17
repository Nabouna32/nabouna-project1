import test from "node:test";
import assert from "node:assert/strict";
import { isValidDiscountRate } from "./reduction";

test("reduction discount rate accepts 0% and 100%", () => {
  assert.equal(isValidDiscountRate(0), true);
  assert.equal(isValidDiscountRate(100), true);
});
