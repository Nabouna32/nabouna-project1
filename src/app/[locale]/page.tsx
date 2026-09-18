import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <main>
      <Hero locale={locale} />
      <Categories locale={locale} />
    </main>
  );
}
