import CategoryCard from "@/components/home/CategoryCard";
import { categories, getToolCount } from "@/lib/tools/categories";
import { getCategoryName, getMessages } from "@/lib/i18n/config";

type CategoriesProps = { locale?: string };

export default function Categories({ locale = "fr" }: CategoriesProps) {
  const t = getMessages(locale);
  const visibleCategories = categories.filter(
    (category) => getToolCount(category.id) > 0,
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
          {t.home.explore}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          {t.home.categoriesTitle}
        </h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          {t.home.categoriesDescription}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            name={getCategoryName(locale, category.id)}
            toolLabel={t.tools.many}
            toolCount={getToolCount(category.id)}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
