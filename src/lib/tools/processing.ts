import type { ToolProcessingMetadata } from "./types.ts";

export type ToolProcessingPresentation = {
  icon: string;
  label: string;
  summary: string;
};

export function getToolProcessingPresentation(
  processing: ToolProcessingMetadata,
): ToolProcessingPresentation {
  switch (processing.mode) {
    case "local":
      return {
        icon: "🔒",
        label: "100 % local",
        summary: "Vos données restent sur votre appareil.",
      };
    case "external":
      return {
        icon: "🌐",
        label: "Service externe",
        summary: "Certaines données sont transmises à un service externe.",
      };
    case "utiluna-server":
      return {
        icon: "☁️",
        label: "Serveur Utiluna",
        summary: "Ce traitement nécessite l’infrastructure Utiluna.",
      };
    case "hybrid":
      return {
        icon: "🔒 + 🌐",
        label: "Traitement hybride",
        summary: "Le traitement local est complété par un service externe.",
      };
  }
}
