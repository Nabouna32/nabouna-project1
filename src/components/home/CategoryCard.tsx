import type { Locale } from "@/lib/i18n/config";
import type { ToolCategory } from "@/lib/tools/categories";
import { Card } from "@/components/ui/Card";

type CategoryCardProps = {
  category: ToolCategory;
  name: string;
  toolLabel: string;
  toolCount: number;
  locale: Locale;
};

export default function CategoryCard({
  category,
  name,
  toolLabel,
  toolCount,
  locale,
}: CategoryCardProps) {
  return (
    <Card
      href={"/" + locale + "/outils/" + category.id}
      className="group p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--accent-soft)] text-2xl">
          {category.icon}
        </span>
        <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1">→</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">{name}</h3>
      <p className="mt-1 text-sm text-[var(--muted)]">{toolCount} {toolLabel}</p>
    </Card>
  );
}
