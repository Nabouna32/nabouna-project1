import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import PercentageCalculator from "@/components/tools/percentage/PercentageCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("pourcentage", locale);
}

export default async function PercentagePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="pourcentage"
      children={<PercentageCalculator />}
      content={
        <>
          <div className="space-y-12">{getToolEditorial("pourcentage", locale)}</div>

          <RelatedTools toolId="pourcentage" />
        </>
      }
    />
  );
}
