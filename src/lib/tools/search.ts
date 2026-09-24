import type { Locale } from "../i18n/config.ts";
import type { Tool } from "@/lib/tools/types";

export type ToolSearchResult = { tool: Tool; score: number };

export function normalizeSearchText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

function getSearchText(tool: Tool, locale: Locale): string {
  const content = tool.content?.[locale] ?? tool.content?.fr;
  return normalizeSearchText([
    content?.name ?? tool.name, content?.description ?? tool.description,
    ...(tool.keywords ?? []), ...(tool.aliases ?? []),
  ].join(" "));
}

export function searchTools(tools: Tool[], query: string, locale: Locale = "fr"): ToolSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return tools.filter((tool) => tool.available).map((tool) => {
    const content = tool.content?.[locale] ?? tool.content?.fr;
    const name = normalizeSearchText(content?.name ?? tool.name);
    const description = normalizeSearchText(content?.description ?? tool.description);
    const keywords = (tool.keywords ?? []).map(normalizeSearchText);
    const aliases = (tool.aliases ?? []).map(normalizeSearchText);
    const haystack = getSearchText(tool, locale);
    let score = 0;
    if (name === normalizedQuery) score += 100;
    if (name.startsWith(normalizedQuery)) score += 60;
    if (name.includes(normalizedQuery)) score += 40;
    if (keywords.some((keyword) => keyword === normalizedQuery)) score += 35;
    if (aliases.some((alias) => alias === normalizedQuery)) score += 35;
    if (keywords.some((keyword) => keyword.startsWith(normalizedQuery))) score += 25;
    if (aliases.some((alias) => alias.startsWith(normalizedQuery))) score += 25;
    if (description.includes(normalizedQuery)) score += 20;
    if (terms.every((term) => haystack.includes(term))) score += 15;
    return { tool, score };
  }).filter(({ score }) => score > 0).sort((a, b) => {
    const aName = a.tool.content?.[locale]?.name ?? a.tool.content?.fr?.name ?? a.tool.name;
    const bName = b.tool.content?.[locale]?.name ?? b.tool.content?.fr?.name ?? b.tool.name;
    return b.score - a.score || aName.localeCompare(bName, locale);
  });
}
