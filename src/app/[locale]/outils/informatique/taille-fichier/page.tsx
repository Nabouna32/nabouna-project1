import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import FileSizeCalculator from "@/components/tools/taille-fichier/FileSizeCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("taille-fichier", locale);
}

export default async function FileSizeCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="taille-fichier"
      <FileSizeCalculator />
      content={
        <>
          <div className="space-y-12">{getToolEditorial("taille-fichier", locale)}</div>
          <RelatedTools toolId="taille-fichier" />
        </>
      }
    />
  );
}
