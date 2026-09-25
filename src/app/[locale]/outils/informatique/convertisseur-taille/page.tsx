import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import FileSizeConverter from "@/components/tools/convertisseur-taille/FileSizeConverter";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("convertisseur-taille", locale);
}

export default async function FileSizeConverterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="convertisseur-taille"
      children={<FileSizeConverter />}
      content={
        <>
          <div className="space-y-12">{getToolEditorial("convertisseur-taille", locale)}</div>

          <RelatedTools toolId="convertisseur-taille" />
        </>
      }
    />
  );
}
