import { test, expect } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";

// Protected Vercel previews can be accessed by CI through a short-lived
// GitHub Actions OIDC token when the project authorizes GitHub Actions as a
// Trusted Source. Local browser tests remain unchanged when no token exists.
test.beforeEach(async ({ page }) => {
  const token = process.env.VERCEL_TRUSTED_OIDC_TOKEN;

  if (token) {
    await page.setExtraHTTPHeaders({
      "x-vercel-trusted-oidc-idp-token": token,
    });
  }
});

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


test("English tools are localized", async ({ page }) => {
  await page.goto(`${baseUrl}/en/outils`, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "All tools" })).toBeVisible();
  await expect(page.getByText("Percentage Calculator")).toBeVisible();
  await expect(page.getByText("Easily calculate a percentage, change, or difference.")).toBeVisible();
});

test("Language settings are available", async ({ page }) => {
  await page.goto(`${baseUrl}/fr/parametres`, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Paramètres" })).toBeVisible();
  const englishButton = page.getByRole("button", { name: "English" });
  await expect(englishButton).toBeVisible();
  await englishButton.click();
  await expect(page).toHaveURL(/\/en\/parametres$/);
});
