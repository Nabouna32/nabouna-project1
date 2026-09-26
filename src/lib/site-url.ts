const fallbackSiteUrl = "http://localhost:3000";

export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

  if (configured) return new URL(configured);
  if (production) return new URL(`https://${production}`);

  return new URL(fallbackSiteUrl);
}
