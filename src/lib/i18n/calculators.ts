import { isLocale } from "@/lib/i18n/config";

const translations: Record<string, { fr: string; en: string }> = {
  "Effacer": { fr: "Effacer", en: "Clear" },
  "Résultat": { fr: "Résultat", en: "Result" },
  "Prix initial": { fr: "Prix initial", en: "Initial price" },
  "Réduction": { fr: "Réduction", en: "Discount" },
  "Prix après réduction": { fr: "Prix après réduction", en: "Price after discount" },
  "Montant économisé": { fr: "Montant économisé", en: "Amount saved" },
  "Date de naissance": { fr: "Date de naissance", en: "Date of birth" },
  "Calculer au": { fr: "Calculer au", en: "Calculate on" },
  "Années": { fr: "Années", en: "Years" },
  "Mois": { fr: "Mois", en: "Months" },
  "Jours": { fr: "Jours", en: "Days" },
  "Date et heure de début": { fr: "Date et heure de début", en: "Start date and time" },
  "Date et heure de fin": { fr: "Date et heure de fin", en: "End date and time" },
  "Heure de début": { fr: "Heure de début", en: "Start time" },
  "Heure de fin": { fr: "Heure de fin", en: "End time" },
  "Heures": { fr: "Heures", en: "Hours" },
  "Minutes": { fr: "Minutes", en: "Minutes" },
  "Vitesse à convertir": { fr: "Vitesse à convertir", en: "Speed to convert" },
  "Unité de départ": { fr: "Unité de départ", en: "From unit" },
  "Unité d'arrivée": { fr: "Unité d'arrivée", en: "To unit" },
  "Taille du fichier": { fr: "Taille du fichier", en: "File size" },
  "Unité de taille du fichier": { fr: "Unité de taille du fichier", en: "File size unit" },
  "Vitesse de téléchargement": { fr: "Vitesse de téléchargement", en: "Download speed" },
  "Unité de vitesse de téléchargement": { fr: "Unité de vitesse de téléchargement", en: "Download speed unit" },
  "Temps estimé": { fr: "Temps estimé", en: "Estimated time" },
  "Valeur à convertir": { fr: "Valeur à convertir", en: "Value to convert" },
  "Entre deux dates": { fr: "Entre deux dates", en: "Between two dates" },
  "Entre deux horaires": { fr: "Entre deux horaires", en: "Between two times" },
};

export function calculatorText(value: string, locale: string): string {
  const selected = isLocale(locale) ? locale : "fr";
  return translations[value]?.[selected] ?? value;
}
