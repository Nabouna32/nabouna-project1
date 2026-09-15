export type ToolCategory = {
  id: string;
  icon: string;
  href: string;
  toolCount: number;
};

export const categories: ToolCategory[] = [
  {
    id: "calculs",
    icon: "🧮",
    href: "/fr/outils/calculs",
    toolCount: 12,
  },
  {
    id: "dates",
    icon: "📅",
    href: "/fr/outils/dates",
    toolCount: 8,
  },
  {
    id: "informatique",
    icon: "💻",
    href: "/fr/outils/informatique",
    toolCount: 10,
  },
  {
    id: "images",
    icon: "🖼️",
    href: "/fr/outils/images",
    toolCount: 6,
  },
  {
    id: "fichiers",
    icon: "📄",
    href: "/fr/outils/fichiers",
    toolCount: 7,
  },
  {
    id: "video",
    icon: "🎬",
    href: "/fr/outils/video",
    toolCount: 5,
  },
];