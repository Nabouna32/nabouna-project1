import ToolSearch from "@/components/tools/ToolSearch";
import ToolCard from "@/components/tools/ToolCard";
import { categories } from "@/lib/tools/categories";
import { tools } from "@/lib/tools/tools";

const categoryNames: Record<string, string> = {
  calculs: "Calculs",
  dates: "Dates & temps",
  informatique: "Informatique",
  images: "Images",
  fichiers: "PDF & fichiers",
  video: "Vidéo",
};

export default function ToolsPage() {
  const visibleCategories = categories.filter((category) =>
    tools.some((tool) => tool.categoryId === category.id)
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
          Utiluna
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Tous les outils
        </h1>

        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          Retrouvez tous nos outils gratuits pour calculer, convertir et
          simplifier vos tâches du quotidien.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">
          Explorer les outils
        </p>
        <ToolSearch />
      </div>

      <div className="mt-12 space-y-12">
        {visibleCategories.map((category) => {
          const categoryTools = tools.filter(
            (tool) => tool.categoryId === category.id
          );

          return (
            <section key={category.id}>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  {category.icon} {categoryNames[category.id]}
                </h2>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  {categoryTools.length}{" "}
                  {categoryTools.length === 1 ? "outil" : "outils"}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    categoryName={categoryNames[category.id]}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
