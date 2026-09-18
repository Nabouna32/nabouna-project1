import type { Tool } from "./types.ts";
import { isLocale } from "../i18n/config.ts";\nimport { getToolDescription, getToolKeywords, getToolName } from "./i18n.ts";

export type ToolSearchResult = {
  tool: Tool;
  score: number;
};

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR")
    .trim();
}

function getSearchText(tool: Tool, locale: string): string {
  return normalizeSearchText(
    [getToolName(tool, locale), getToolDescription(tool, locale), ...getToolKeywords(tool, locale)].join(" "),
  );
}

export function searchTools(tools: Tool[], query: string, locale = "fr"): ToolSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return tools
    .filter((tool) => tool.available)
    .map((tool) => {
      const name = normalizeSearchText(getToolName(tool, locale));
      const description = normalizeSearchText(getToolDescription(tool, locale));
      const keywords = getToolKeywords(tool, locale).map(normalizeSearchText);
      const haystack = getSearchText(tool, locale);

      let score = 0;

      if (name === normalizedQuery) score += 100;
      if (name.startsWith(normalizedQuery)) score += 60;
      if (name.includes(normalizedQuery)) score += 40;
      if (keywords.some((keyword) => keyword === normalizedQuery)) score += 35;
      if (keywords.some((keyword) => keyword.startsWith(normalizedQuery))) score += 25;
      if (description.includes(normalizedQuery)) score += 20;
      if (terms.every((term) => haystack.includes(term))) score += 15;

      return { tool, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {\n      const localeCode = isLocale(locale) ? locale : "fr";\n      return b.score - a.score || getToolName(a.tool, locale).localeCompare(getToolName(b.tool, locale), localeCode);\n    });
}
