import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import ReductionCalculator from "@/components/tools/reduction/ReductionCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("reduction", locale);
}

export default async function ReductionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="reduction"
      children={<ReductionCalculator />}
      content={
        <>
          <div className="space-y-12">{getToolEditorial("reduction", locale)}</div>

          <RelatedTools toolId="reduction" />
        </>
      }
    />
  );
}
