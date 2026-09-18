import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";
import type { Tool } from "@/lib/tools/types";

export function getToolName(tool: Tool, locale: string): string {
  const selectedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return tool.nameByLocale?.[selectedLocale] ?? tool.name;
}

export function getToolDescription(tool: Tool, locale: string): string {
  const selectedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return tool.descriptionByLocale?.[selectedLocale] ?? tool.description;
}

export function getToolKeywords(tool: Tool, locale: string): string[] {
  const selectedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  return tool.keywordsByLocale?.[selectedLocale] ?? tool.keywords ?? [];
}
