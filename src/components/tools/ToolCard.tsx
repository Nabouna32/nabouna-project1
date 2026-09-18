"use client";

import { usePathname } from "next/navigation";
import type { Tool } from "@/lib/tools/types";

type ToolCardProps = {
  tool: Tool;
  categoryName?: string;
};

export default function ToolCard({
  tool,
  categoryName,
}: ToolCardProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <a
      href={`/${locale}/outils/${tool.categoryId}/${tool.slug}`}
      className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-black/5"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
          {tool.icon}
        </span>

        <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">
        {tool.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
        {tool.description}
      </p>

      {categoryName && (
        <p className="mt-4 text-xs font-medium text-[var(--accent)]">
          {categoryName}
        </p>
      )}
    </a>
  );
}