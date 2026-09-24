import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getToolSeo } from "./seo";

export function getToolPageMetadata(toolId: string, locale: Locale): Metadata {
  const seo = getToolSeo(toolId, locale);
  return {
    title: seo.title,
    description: seo.description,
  };
}
