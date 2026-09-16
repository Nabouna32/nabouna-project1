import Link from "next/link";
import { tools } from "@/lib/tools/tools";
import { getRelatedTools } from "@/lib/tools/relations";

type RelatedToolsProps = {
  toolId: string;
};

export default function RelatedTools({ toolId }: RelatedToolsProps) {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) return null;

  const relatedTools = getRelatedTools(tool, tools);
  if (relatedTools.length === 0) return null;

  return (
    <section
      className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7"
      aria-labelledby="related-tools-title"
    >
      <h2
        id="related-tools-title"
        className="text-xl font-bold text-[var(--foreground)] sm:text-2xl"
      >
        Vous pourriez aussi avoir besoin de
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedTools.map((relatedTool) => (
          <Link
            key={relatedTool.id}
            href={`/fr/outils/${relatedTool.categoryId}/${relatedTool.slug}`}
            className="group rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-lg hover:shadow-black/5"
          >
            <span className="text-2xl" aria-hidden="true">
              {relatedTool.icon}
            </span>
            <h3 className="mt-4 font-semibold text-[var(--foreground)]">
              {relatedTool.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {relatedTool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
