import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import DownloadSpeedConverter from "@/components/tools/vitesse-telechargement/DownloadSpeedConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("vitesse-telechargement", locale);
}

export default async function DownloadSpeedConverterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="vitesse-telechargement"
      content={
        <>
          <DownloadSpeedConverter />

          <div className="space-y-12">{getToolEditorial("vitesse-telechargement", locale)}</div>

          <RelatedTools toolId="vitesse-telechargement" />
        </>
      }
    />
  );
}
