import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";

test("French homepage renders", async ({ page }) => {
  await page.goto(`${baseUrl}/fr`, { waitUntil: "networkidle" });

  await expect(page).toHaveTitle(/Utiluna/i);
  await expect(page.locator("main")).toBeVisible();
  await expect(page.getByRole("link").first()).toBeVisible();
});

test("tools page renders", async ({ page }) => {
  await page.goto(`${baseUrl}/fr/outils`, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Tous les outils" })).toBeVisible();
  await expect(page.getByText("Retrouvez tous nos outils gratuits")).toBeVisible();
});

test("English locale renders", async ({ page }) => {
  await page.goto(`${baseUrl}/en`, { waitUntil: "networkidle" });

  await expect(page.locator("main")).toBeVisible();
});
