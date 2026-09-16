import { test, expect } from "@playwright/test";

test("French homepage renders", async ({ page }) => {
  await page.goto("/fr", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Utiluna/i);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("link").first()).toBeVisible();
});

test("tools page renders", async ({ page }) => {
  await page.goto("/fr/outils", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Tous les outils" })).toBeVisible();
  await expect(page.getByText("Retrouvez tous nos outils gratuits")).toBeVisible();
});

test("English locale renders", async ({ page }) => {
  await page.goto("/en", { waitUntil: "networkidle" });

  await expect(page.locator("main")).toBeVisible();
});
