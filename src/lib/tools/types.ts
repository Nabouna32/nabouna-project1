import type { Locale } from "../i18n/config";

export type LocalizedText = Record<Locale, string>;

export type Tool = {
  id: string;
  slug: string;
  categoryId: string;
  icon: string;
  name: string;
  description: string;
  keywords?: string[];
  nameByLocale?: LocalizedText;
  descriptionByLocale?: LocalizedText;
  keywordsByLocale?: Record<Locale, string[]>;
  available: boolean;
};
