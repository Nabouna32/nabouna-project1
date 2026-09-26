import type { ComponentType } from "react";
import type { Tool } from "@/lib/tools/types";
import { tools } from "@/lib/tools/tools";

export type ToolModule = {
  load: () => Promise<{ default: ComponentType }>;
};

type ToolRegistryEntry = {
  tool: Tool;
  module: ToolModule;
};

const moduleLoaders: Record<string, ToolModule> = {
  pourcentage: { load: () => import("@/components/tools/percentage/PercentageCalculator") },
  reduction: { load: () => import("@/components/tools/reduction/ReductionCalculator") },
  tva: { load: () => import("@/components/tools/tva/TVACalculator") },
  "regle-de-trois": { load: () => import("@/components/tools/regle-de-trois/RuleOfThreeCalculator") },
  age: { load: () => import("@/components/tools/age/AgeCalculator") },
  duree: { load: () => import("@/components/tools/duree/DurationCalculator") },
  "vitesse-telechargement": { load: () => import("@/components/tools/vitesse-telechargement/DownloadSpeedConverter") },
  "temps-telechargement": { load: () => import("@/components/tools/temps-telechargement/DownloadTimeCalculator") },
  "taille-fichier": { load: () => import("@/components/tools/taille-fichier/FileSizeCalculator") },
  "convertisseur-taille": { load: () => import("@/components/tools/convertisseur-taille/FileSizeConverter") },
  "mots-caracteres": { load: () => import("@/components/tools/text-counter/TextCounter") },
};

export const toolRegistry: readonly ToolRegistryEntry[] = tools
  .filter((tool) => tool.available)
  .map((tool) => {
    const module = moduleLoaders[tool.id];
    if (!module) {
      throw new Error(`Published tool "${tool.id}" has no registered module.`);
    }
    return { tool, module };
  });

const registryById = new Map(toolRegistry.map((entry) => [entry.tool.id, entry]));

export function getToolRegistryEntry(toolId: string): ToolRegistryEntry | undefined {
  return registryById.get(toolId);
}

export function getToolByRoute(category: string, slug: string): ToolRegistryEntry | undefined {
  const entry = toolRegistry.find(
    ({ tool }) => tool.categoryId === category && tool.slug === slug,
  );
  return entry;
}
