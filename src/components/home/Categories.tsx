import { categories } from "@/lib/tools/categories";
import CategoryCard from "@/components/home/CategoryCard";

const categoryNames: Record<string, string> = {
  calculs: "Calculs",
  dates: "Dates & temps",
  informatique: "Informatique",
  images: "Images",
  fichiers: "PDF & fichiers",
  video: "Vidéo",
};

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
          Explorer
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Trouvez l'outil dont vous avez besoin
        </h2>

        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Parcourez nos différentes catégories pour trouver rapidement le bon
          outil.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            name={categoryNames[category.id]}
            toolLabel="outils"
          />
        ))}
      </div>
    </section>
  );
}