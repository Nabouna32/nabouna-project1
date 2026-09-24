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

test("text counter tool renders and counts words", async ({ page }) => {
  await page.goto(`${baseUrl}/fr/outils/fichiers/mots-caracteres`, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Compteur de mots et caractères" })).toBeVisible();
  const input = page.getByLabel("Votre texte");
  await input.fill("Bonjour le monde");
  await expect(page.getByText("Mots").locator("..")).toContainText("3");
  await expect(page.getByText("Caractères", { exact: true }).locator("..")).toContainText("16");
});
