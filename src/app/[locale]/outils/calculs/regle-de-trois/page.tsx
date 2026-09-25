import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import RelatedTools from "@/components/tools/RelatedTools";
import { getToolEditorial } from "@/lib/tools/editorial";
import RuleOfThreeCalculator from "@/components/tools/regle-de-trois/RuleOfThreeCalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("regle-de-trois", locale);
}

export default async function RuleOfThreePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="regle-de-trois"
      content={
        <>
          <div className="space-y-12">{getToolEditorial("regle-de-trois", locale)}</div>

          <RelatedTools toolId="regle-de-trois" />
        </>
      }
    >
      <RuleOfThreeCalculator />
    </ToolPage>
  );
}
