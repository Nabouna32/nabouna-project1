export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

const messages = {
  fr: {
    nav: { home: "Accueil", tools: "Outils" },
    home: {
      badge: "Des outils simples pour le quotidien",
      title: "Trouvez l’outil qu’il vous faut.",
      description: "Calculs, conversions, dates, fichiers et bien plus.",
      description2: "Des outils gratuits, rapides et faciles à utiliser.",
      examples: "Essayez : TVA, remise, internet, vidéo, âge...",
      explore: "Explorer",
      categoriesTitle: "Trouvez l’outil dont vous avez besoin",
      categoriesDescription: "Parcourez nos différentes catégories pour trouver rapidement le bon outil.",
    },
    tools: {
      eyebrow: "Utiluna",
      title: "Tous les outils",
      description: "Retrouvez tous nos outils gratuits pour calculer, convertir et simplifier vos tâches du quotidien.",
      explore: "Explorer les outils",
      one: "outil",
      many: "outils",
      back: "← Tous les outils",
      categoryDescription: "Retrouvez les outils disponibles dans la catégorie",
      searchPlaceholder: "Que recherchez-vous ?",
    },
    search: {
      label: "Rechercher un outil",
      clear: "Effacer la recherche",
      button: "Rechercher",
      suggestions: "Suggestions",
      resultOne: "résultat",
      resultMany: "résultats",
      none: "Aucun outil trouvé pour",
      hint: "Essayez « TVA », « internet », « vidéo » ou « âge ».",
      tool: "Outil",
    },
  },
  en: {
    nav: { home: "Home", tools: "Tools" },
    home: {
      badge: "Simple tools for everyday life",
      title: "Find the tool you need.",
      description: "Calculations, conversions, dates, files and more.",
      description2: "Free, fast and easy-to-use tools.",
      examples: "Try: VAT, discount, internet, video, age...",
      explore: "Explore",
      categoriesTitle: "Find the tool you need",
      categoriesDescription: "Browse our categories to quickly find the right tool.",
    },
    tools: {
      eyebrow: "Utiluna",
      title: "All tools",
      description: "Find all our free tools to calculate, convert and simplify everyday tasks.",
      explore: "Explore tools",
      one: "tool",
      many: "tools",
      back: "← All tools",
      categoryDescription: "Find the tools available in the",
      searchPlaceholder: "What are you looking for?",
    },
    search: {
      label: "Search for a tool",
      clear: "Clear search",
      button: "Search",
      suggestions: "Suggestions",
      resultOne: "result",
      resultMany: "results",
      none: "No tool found for",
      hint: "Try “VAT”, “internet”, “video” or “age”.",
      tool: "Tool",
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];

export function getMessages(locale: string): Messages {
  return messages[isLocale(locale) ? locale : defaultLocale];
}

export const categoryNames = {
  fr: {
    calculs: "Calculs",
    dates: "Dates & temps",
    informatique: "Informatique",
    images: "Images",
    fichiers: "PDF & fichiers",
    video: "Vidéo",
  },
  en: {
    calculs: "Calculations",
    dates: "Dates & time",
    informatique: "Computing",
    images: "Images",
    fichiers: "PDF & files",
    video: "Video",
  },
} as const;

export function getCategoryName(locale: string, categoryId: string): string {
  const selected = categoryNames[isLocale(locale) ? locale : defaultLocale];
  return selected[categoryId as keyof typeof selected] ?? categoryId;
}
