import type { Tool } from "@/lib/tools/types";
import { normalizeSearchText } from "@/lib/tools/search";

function getTerms(tool: Tool): string[] {
  return [tool.name, ...(tool.keywords ?? [])]
    .flatMap((value) => normalizeSearchText(value).split(/\s+/))
    .filter((term) => term.length >= 3);
}

/**
 * Finds related tools from catalogue metadata. No tool needs to list its
 * neighbours manually: category and shared keywords drive the relation score.
 */
export function getRelatedTools(
  tool: Tool,
  allTools: Tool[],
  limit = 3,
): Tool[] {
  const sourceTerms = new Set(getTerms(tool));

  return allTools
    .filter((candidate) => candidate.available && candidate.id !== tool.id)
    .map((candidate) => {
      const candidateTerms = getTerms(candidate);
      const sharedTerms = candidateTerms.filter((term) => sourceTerms.has(term));
      const score =
        sharedTerms.length * 10 +
        (candidate.categoryId === tool.categoryId ? 5 : 0);

      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.candidate.name.localeCompare(b.candidate.name, "fr"),
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
