import type { Tool } from "@/lib/tools/types";
import { validateToolCatalog } from "@/lib/tools/metadata";
import { toolSeo } from "@/lib/tools/seo";

export const tools: Tool[] = [
  {
    id: "pourcentage", slug: "pourcentage", categoryId: "calculs", icon: "📊",
    name: "Calculateur de pourcentage",
    description: "Calculez facilement un pourcentage, une évolution ou une différence.",
    keywords: ["%", "évolution", "différence", "variation", "taux"], available: true,
    content: {
      fr: { name: "Calculateur de pourcentage", description: "Calculez facilement un pourcentage, une évolution ou une différence." },
      en: { name: "Percentage Calculator", description: "Easily calculate a percentage, change, or difference." },
    },
  },
  {
    id: "reduction", slug: "reduction", categoryId: "calculs", icon: "🏷️",
    name: "Calculateur de réduction",
    description: "Calculez le prix après une réduction et le montant économisé.",
    keywords: ["remise", "promotion", "solde", "prix", "économie"], available: true,
    content: {
      fr: { name: "Calculateur de réduction", description: "Calculez le prix après une réduction et le montant économisé." },
      en: { name: "Discount Calculator", description: "Calculate the price after a discount and the amount saved." },
    },
  },
  {
    id: "tva", slug: "tva", categoryId: "calculs", icon: "💶",
    name: "Calculateur TVA HT / TTC",
    description: "Convertissez facilement un prix HT en TTC et inversement.",
    keywords: ["taxe", "hors taxe", "toutes taxes", "prix", "tva", "ht", "ttc"], available: true,
    content: {
      fr: { name: "Calculateur TVA HT / TTC", description: "Convertissez facilement un prix HT en TTC et inversement." },
      en: { name: "VAT Calculator", description: "Convert prices between net and gross amounts with VAT." },
    },
  },
  {
    id: "regle-de-trois", slug: "regle-de-trois", categoryId: "calculs", icon: "⚖️",
    name: "Règle de trois", description: "Résolvez rapidement vos calculs de proportionnalité.",
    keywords: ["proportion", "proportionnalité", "ratio", "quantité", "prix"], available: true,
    content: {
      fr: { name: "Règle de trois", description: "Résolvez rapidement vos calculs de proportionnalité." },
      en: { name: "Rule of Three Calculator", description: "Quickly solve proportionality calculations." },
    },
  },
  {
    id: "age", slug: "age", categoryId: "dates", icon: "🎂",
    name: "Calculateur d'âge", description: "Calculez précisément votre âge à partir d'une date de naissance.",
    keywords: ["anniversaire", "naissance", "date"], available: true,
    content: {
      fr: { name: "Calculateur d'âge", description: "Calculez précisément votre âge à partir d'une date de naissance." },
      en: { name: "Age Calculator", description: "Calculate your exact age from a birth date." },
    },
  },
  {
    id: "duree", slug: "duree", categoryId: "dates", icon: "⏱️",
    name: "Calculateur de durée", description: "Calculez la durée entre deux dates ou deux horaires.",
    keywords: ["temps", "date", "heures", "jours", "intervalle"], available: true,
    content: {
      fr: { name: "Calculateur de durée", description: "Calculez la durée entre deux dates ou deux horaires." },
      en: { name: "Duration Calculator", description: "Calculate the duration between two dates or times." },
    },
  },
  {
    id: "vitesse-telechargement", slug: "vitesse-telechargement", categoryId: "informatique", icon: "🚀",
    name: "Mbps ↔ Mo/s", description: "Convertissez une vitesse Internet entre Mbps et Mo/s.",
    keywords: ["internet", "débit", "connexion", "megabit", "mégaoctet"], available: true,
    content: {
      fr: { name: "Mbps ↔ Mo/s", description: "Convertissez une vitesse Internet entre Mbps et Mo/s." },
      en: { name: "Download Speed Converter", description: "Convert internet speed between Mbps and MB/s." },
    },
  },
  {
    id: "temps-telechargement", slug: "temps-telechargement", categoryId: "informatique", icon: "⏳",
    name: "Temps de téléchargement", description: "Estimez le temps nécessaire pour télécharger un fichier.",
    keywords: ["download", "internet", "débit", "fichier", "durée"], available: true,
    content: {
      fr: { name: "Temps de téléchargement", description: "Estimez le temps nécessaire pour télécharger un fichier." },
      en: { name: "Download Time Calculator", description: "Estimate how long it takes to download a file." },
    },
  },
  {
    id: "taille-fichier", slug: "taille-fichier", categoryId: "informatique", icon: "💾",
    name: "Calculateur de taille de fichier", description: "Estimez la taille d'un fichier selon sa durée et son débit.",
    keywords: ["poids", "taille", "stockage", "vidéo", "audio", "bitrate"], available: true,
    content: {
      fr: { name: "Calculateur de taille de fichier", description: "Estimez la taille d'un fichier selon sa durée et son débit." },
      en: { name: "File Size Calculator", description: "Estimate a file size from its duration and bitrate." },
    },
  },
  {
    id: "convertisseur-taille", slug: "convertisseur-taille", categoryId: "informatique", icon: "🔄",
    name: "Convertisseur de taille", description: "Convertissez facilement Ko, Mo, Go, To et autres unités.",
    keywords: ["ko", "mo", "go", "to", "octets", "stockage"], available: true,
    content: {
      fr: { name: "Convertisseur de taille", description: "Convertissez facilement Ko, Mo, Go, To et autres unités." },
      en: { name: "File Size Converter", description: "Convert file sizes between bytes, KB, MB, GB, TB, and more." },
    },
  },
  {
    id: "mots-caracteres", slug: "mots-caracteres", categoryId: "fichiers", icon: "🔤",
    name: "Compteur de mots et caractères", description: "Comptez les mots, caractères, espaces et lignes d'un texte.",
    keywords: ["texte", "lettres", "compter", "ligne", "paragraphes"], available: true,
    content: {
      fr: { name: "Compteur de mots et caractères", description: "Comptez les mots, caractères, espaces et lignes d'un texte." },
      en: { name: "Word and Character Counter", description: "Count words, characters, spaces, and lines in a text." },
    },
  },
  {
    id: "bitrate-video", slug: "bitrate-video", categoryId: "video", icon: "🎬",
    name: "Calculateur bitrate vidéo", description: "Calculez le bitrate ou la taille approximative d'une vidéo.",
    keywords: ["vidéo", "qualité", "débit", "encodage", "compression"], available: false,
    content: {
      fr: { name: "Calculateur bitrate vidéo", description: "Calculez le bitrate ou la taille approximative d'une vidéo." },
      en: { name: "Video Bitrate Calculator", description: "Calculate video bitrate or approximate file size." },
    },
  },
].map((tool): Tool => ({
  ...tool,
  version: 1,
  complexity: tool.id === "taille-fichier" || tool.id === "bitrate-video" ? "advanced" : "small",
  categories: [tool.categoryId],
  tags: tool.keywords ?? [],
  aliases: tool.keywords ?? [],
  seo: toolSeo[tool.id],
  examples: [],
  processing: {
    mode: "local",
    dataCategories: [],
    externalProviders: [],
    storage: "none",
    retention: "Aucune donnée n'est transmise ou stockée par Utiluna.",
    fallback: "Le traitement ne dépend pas d'un service distant.",
  },
  capabilities: ["local-processing"],
  browserRequirements: { apis: [] },
  offline: true,
  sharing: { supported: false, mode: "none" },
  relatedToolIds: [],
  quality: { accessibility: "required", performance: "standard", tests: tool.available ? "required" : "not-yet" },
  lifecycle: tool.available ? "published" : "draft",
  contributor: { type: "internal" },
}));

validateToolCatalog(tools);
