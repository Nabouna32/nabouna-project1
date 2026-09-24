import type { Tool } from "@/lib/tools/types";

export function validateToolCatalog(tools: readonly Tool[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const tool of tools) {
    if (ids.has(tool.id)) throw new Error(`Duplicate tool id: ${tool.id}`);
    if (slugs.has(tool.slug)) throw new Error(`Duplicate tool slug: ${tool.slug}`);
    ids.add(tool.id);
    slugs.add(tool.slug);

    if (tool.categories.length === 0) {
      throw new Error(`Tool "${tool.id}" must declare at least one category.`);
    }
    if (!tool.content.fr.name.trim() || !tool.content.fr.description.trim()) {
      throw new Error(`Tool "${tool.id}" must declare French name and description.`);
    }
    if (tool.version < 1 || !Number.isInteger(tool.version)) {
      throw new Error(`Tool "${tool.id}" must declare a positive integer version.`);
    }
    if (tool.processing.mode === "local" && tool.processing.externalProviders.length > 0) {
      throw new Error(`Local tool "${tool.id}" cannot declare external providers.`);
    }
    if (tool.processing.mode === "local" && !["none", "local"].includes(tool.processing.storage)) {
      throw new Error(`Local tool "${tool.id}" has incompatible storage metadata.`);
    }
    if (tool.offline && tool.processing.mode !== "local") {
      throw new Error(`Only local tools can be declared offline: ${tool.id}`);
    }
    if (!tool.sharing.supported && tool.sharing.mode !== "none") {
      throw new Error(`Tool "${tool.id}" has sharing mode without sharing support.`);
    }
    if (tool.sharing.supported && tool.sharing.mode === "none") {
      throw new Error(`Tool "${tool.id}" enables sharing without a sharing mode.`);
    }
  }

  const knownIds = new Set(ids);
  for (const tool of tools) {
    for (const relatedId of tool.relatedToolIds) {
      if (!knownIds.has(relatedId)) {
        throw new Error(`Tool "${tool.id}" references unknown related tool "${relatedId}".`);
      }
      if (relatedId === tool.id) {
        throw new Error(`Tool "${tool.id}" cannot reference itself as related.`);
      }
    }
  }
}
