import type { Locale } from "@/lib/i18n/config";
import type { ToolSeoMetadata } from "./types";

export const toolSeo: Record<string, Record<Locale, ToolSeoMetadata>> = {
  pourcentage: {
    fr: { title: "Calculateur de pourcentage gratuit | Utiluna", description: "Calculez facilement un pourcentage, une augmentation ou une diminution en pourcentage grâce à notre calculateur gratuit." },
    en: { title: "Free Percentage Calculator | Utiluna", description: "Easily calculate percentages, increases, and decreases with our free percentage calculator." },
  },
  reduction: {
    fr: { title: "Calculateur de réduction gratuit | Utiluna", description: "Calculez le prix après une réduction et le montant économisé grâce à notre calculateur gratuit." },
    en: { title: "Free Discount Calculator | Utiluna", description: "Calculate the price after a discount and the amount saved with our free discount calculator." },
  },
  tva: {
    fr: { title: "Calculateur TVA HT / TTC gratuit | Utiluna", description: "Calculez rapidement un prix HT, TTC et le montant de TVA avec le taux de votre choix." },
    en: { title: "VAT Calculator | Utiluna", description: "Calculate net and gross prices and the VAT amount using your chosen rate." },
  },
  "regle-de-trois": {
    fr: { title: "Règle de trois en ligne | Utiluna", description: "Résolvez rapidement un calcul de proportionnalité avec notre calculateur de règle de trois gratuit." },
    en: { title: "Rule of Three Calculator | Utiluna", description: "Quickly solve proportionality calculations with our free rule of three calculator." },
  },
  age: {
    fr: { title: "Calculateur d'âge | Utiluna", description: "Calculez précisément votre âge en années, mois et jours." },
    en: { title: "Age Calculator | Utiluna", description: "Calculate your exact age in years, months, and days." },
  },
  duree: {
    fr: { title: "Calculateur de durée | Utiluna", description: "Calculez facilement une durée entre deux dates ou deux horaires." },
    en: { title: "Duration Calculator | Utiluna", description: "Easily calculate a duration between two dates or two times." },
  },
  "convertisseur-taille": {
    fr: { title: "Convertisseur de taille de fichier | Utiluna", description: "Convertissez facilement une taille de fichier entre octets, Ko, Mo, Go et To." },
    en: { title: "File Size Converter | Utiluna", description: "Easily convert file sizes between bytes, KB, MB, GB, and TB." },
  },
  "temps-telechargement": {
    fr: { title: "Temps de téléchargement | Utiluna", description: "Estimez le temps nécessaire pour télécharger un fichier selon sa taille et votre débit." },
    en: { title: "Download Time Calculator | Utiluna", description: "Estimate how long it takes to download a file based on its size and connection speed." },
  },
  "vitesse-telechargement": {
    fr: { title: "Convertisseur Mbps Mo/s | Utiluna", description: "Convertissez une vitesse Internet entre Mbps, Gbps, Ko/s, Mo/s et Go/s." },
    en: { title: "Download Speed Converter | Utiluna", description: "Convert internet speeds between Mbps, Gbps, KB/s, MB/s, and GB/s." },
  },
};

export function getToolSeo(toolId: string, locale: Locale): ToolSeoMetadata {
  const seo = toolSeo[toolId]?.[locale];
  if (!seo) throw new Error(\`Missing \${locale} SEO metadata for tool "\${toolId}".\`);
  return seo;
}
