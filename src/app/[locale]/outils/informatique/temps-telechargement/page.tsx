import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import DownloadTimeCalculator from "@/components/tools/temps-telechargement/DownloadTimeCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("temps-telechargement", locale);
}

export default async function DownloadTimeCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="temps-telechargement"
      content={
        <>
          <DownloadTimeCalculator />

          <RelatedTools toolId="temps-telechargement" />

          <div className="space-y-12">{getToolEditorial("temps-telechargement", locale)}</div>
        </>
      }
    />
  );
}
