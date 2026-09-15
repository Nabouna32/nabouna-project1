import type { ToolCategory } from "@/lib/tools/categories";

type CategoryCardProps = {
  category: ToolCategory;
  name: string;
  toolLabel: string;
  toolCount: number;
};

export default function CategoryCard({
  category,
  name,
  toolLabel,
  toolCount,
}: CategoryCardProps) {
  return (
    <a
      href={category.href}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
          {category.icon}
        </span>

        <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>

          <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
              {name}
          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
              {toolCount} {toolLabel}
          </p>
      </a>
  );
}