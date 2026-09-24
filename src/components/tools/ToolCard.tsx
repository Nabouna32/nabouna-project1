"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Tool } from "@/lib/tools/types";

export default function ToolCard({ tool, categoryName }: { tool: Tool; categoryName?: string }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale: Locale = isLocale(segment) ? segment : "fr";
  const content = tool.content[locale] ?? tool.content.fr;
  return (
    <Link href={"/" + locale + "/outils/" + tool.categoryId + "/" + tool.slug} className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-black/5">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">{tool.icon}</span>
        <span className="text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-1">→</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)]">{content.name}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{content.description}</p>
      {categoryName && <p className="mt-4 text-xs font-medium text-[var(--accent)]">{categoryName}</p>}
    </Link>
  );
}
