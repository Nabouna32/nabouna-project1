import type { Tool } from "@/lib/tools/types";

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

function getSearchText(tool: Tool): string {
  return normalizeSearchText(
    [tool.name, tool.description, ...(tool.keywords ?? [])].join(" "),
  );
}

export function searchTools(tools: Tool[], query: string): ToolSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return tools
    .filter((tool) => tool.available)
    .map((tool) => {
      const name = normalizeSearchText(tool.name);
      const description = normalizeSearchText(tool.description);
      const keywords = (tool.keywords ?? []).map(normalizeSearchText);
      const haystack = getSearchText(tool);

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
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name, "fr"));
}
