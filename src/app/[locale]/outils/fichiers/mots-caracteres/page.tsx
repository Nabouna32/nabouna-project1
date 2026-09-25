import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import TextCounter from "@/components/tools/text-counter/TextCounter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("mots-caracteres", locale);
}

export default async function TextCounterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <ToolPage
      locale={locale}
      toolId="mots-caracteres"
      content={
        <>
          <div className="space-y-12">{getToolEditorial("mots-caracteres", locale)}</div>
          <RelatedTools toolId="mots-caracteres" />
        </>
      }
    >
      <TextCounter />
    </ToolPage>
  );
}
