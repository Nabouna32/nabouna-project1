import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import TVACalculator from "@/components/tools/tva/TVACalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("tva", locale);
}

export default async function TVAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="tva"
      content={
        <>
          <div className="space-y-12">{getToolEditorial("tva", locale)}</div>

          <RelatedTools toolId="tva" />
        </>
      }
    >
      <TVACalculator />
    </ToolPage>
  );
}
