import type { Locale } from "@/lib/i18n/config";

export type ToolComplexity = "small" | "advanced" | "mini-application";
export type ToolProcessingMode = "local" | "external" | "utiluna-server" | "hybrid";
export type ToolLifecycle = "draft" | "review" | "published" | "hidden" | "archived";
export type ToolSharingMode = "none" | "configuration" | "result" | "configuration-and-result";
export type ToolCapability =
  | "local-processing"
  | "file-input"
  | "clipboard"
  | "camera"
  | "microphone"
  | "geolocation"
  | "network"
  | "account-data"
  | "database";

export type ToolLocalizedContent = { name: string; description: string };
export type ToolExample = { label: string; description?: string };
export type ToolSeoMetadata = { title: string; description: string };
export type ToolProcessingMetadata = {
  mode: ToolProcessingMode;
  description: Partial<Record<Locale, string>> & { fr: string };
  dataCategories: string[];
  externalProviders: string[];
  storage: "none" | "local" | "utiluna" | "external" | "hybrid";
  retention: string;
  fallback: string;
};
export type ToolBrowserRequirements = { apis: string[]; minimumFeatures?: string[] };
export type ToolSharingMetadata = { supported: boolean; mode: ToolSharingMode };
export type ToolQualityMetadata = {
  accessibility: "required";
  performance: "standard" | "heavy";
  tests: "required" | "partial" | "not-yet";
};
export type ToolContributor = { type: "internal" | "community"; name?: string };

export type Tool = {
  // Compatibility fields retained while the catalog UI migrates to structured content.
  id: string;
  slug: string;
  categoryId: string;
  icon: string;
  name: string;
  description: string;
  keywords?: string[];
  available: boolean;

  // Formal tool metadata contract.
  version: number;
  complexity: ToolComplexity;
  categories: string[];
  content: Partial<Record<Locale, ToolLocalizedContent>> & { fr: ToolLocalizedContent };
  tags: string[];
  aliases: string[];
  seo: Record<Locale, ToolSeoMetadata>;
  examples: ToolExample[];
  processing: ToolProcessingMetadata;
  capabilities: ToolCapability[];
  browserRequirements: ToolBrowserRequirements;
  offline: boolean;
  sharing: ToolSharingMetadata;
  relatedToolIds: string[];
  quality: ToolQualityMetadata;
  lifecycle: ToolLifecycle;
  contributor: ToolContributor;
};

export function getToolContent(tool: Tool, locale: Locale): ToolLocalizedContent {
  return tool.content[locale] ?? tool.content.fr;
}

export function getPrimaryToolCategory(tool: Tool): string {
  const category = tool.categories[0];
  if (!category) throw new Error(`Tool "${tool.id}" must declare at least one category.`);
  return category;
}
