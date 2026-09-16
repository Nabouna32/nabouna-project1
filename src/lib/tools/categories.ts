import { tools } from "@/lib/tools/tools";

export type ToolCategory = {
  id: string;
  icon: string;
  href: string;
};

export const categories: ToolCategory[] = [
  {
    id: "calculs",
    icon: "🧮",
    href: "/fr/outils/calculs",
  },
  {
    id: "dates",
    icon: "📅",
    href: "/fr/outils/dates",
  },
  {
    id: "informatique",
    icon: "💻",
    href: "/fr/outils/informatique",
  },
  {
    id: "images",
    icon: "🖼️",
    href: "/fr/outils/images",
  },
  {
    id: "fichiers",
    icon: "📄",
    href: "/fr/outils/fichiers",
  },
  {
    id: "video",
    icon: "🎬",
    href: "/fr/outils/video",
  },
];

export function getToolCount(categoryId: string): number {
  return tools.filter(
    (tool) => tool.categoryId === categoryId && tool.available,
  ).length;
}
