import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
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

          <RelatedTools toolId="vitesse-telechargement" />

          <ToolSection title="📐 Comment convertir un débit Internet ?">
            <p>
              Saisissez une vitesse, choisissez son unité de départ puis l’unité
              souhaitée. Les conversions utilisent les unités décimales :
              1 Mbps = 1 000 000 bits/s et 1 Mo/s = 1 000 000 octets/s.
              Comme 1 octet vaut 8 bits, 100 Mbps correspondent à 12,5 Mo/s.
            </p>
          </ToolSection>

          <ToolSection title="💡 Pourquoi convertir Mbps en Mo/s ?">
            <p>
              Les fournisseurs d’accès indiquent généralement les débits en
              mégabits par seconde (Mbps), tandis que les logiciels de
              téléchargement affichent souvent les vitesses en mégaoctets par
              seconde (Mo/s). Cette conversion permet de comparer les deux
              valeurs plus facilement.
            </p>
          </ToolSection>

          <div className="mt-8 flex justify-start">
            <Link
              href="/fr/outils"
              className="text-sm font-medium text-[var(--accent)] hover:underline"
            >
              ← Retour aux outils
            </Link>
          </div>
        </>
      }
    />
  );
}
