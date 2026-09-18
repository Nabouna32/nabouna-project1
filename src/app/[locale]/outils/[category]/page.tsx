import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "@/components/tools/ToolCard";
import { categories } from "@/lib/tools/categories";
import { tools } from "@/lib/tools/tools";
import { getCategoryName, getMessages, locales } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    categories
      .filter((category) => tools.some((tool) => tool.categoryId === category.id && tool.available))
      .map((category) => ({ locale, category: category.id })),
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category: categoryId } = await params;
  const category = categories.find((item) => item.id === categoryId);
  const categoryTools = tools.filter((tool) => tool.categoryId === categoryId && tool.available);

  if (!category || categoryTools.length === 0) notFound();

  const t = getMessages(locale);
  const categoryName = getCategoryName(locale, categoryId);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Link href={`/${locale}/outils`} className="text-sm font-medium text-[var(--accent)] hover:underline">
          {t.tools.back}
        </Link>
        <p className="mt-8 text-3xl" aria-hidden="true">{category.icon}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">{categoryName}</h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          {t.tools.categoryDescription} {categoryName.toLowerCase()}.
        </p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => <ToolCard key={tool.id} tool={tool} categoryName={categoryName} />)}
      </div>
    </main>
  );
}
