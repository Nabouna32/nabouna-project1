import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
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

          <ToolSection title="📥 Comment calculer un temps de téléchargement ?">
            <p>
              Indiquez la taille du fichier et votre vitesse de téléchargement.
              Le calcul estime le temps nécessaire en supposant que le débit reste
              constant pendant tout le téléchargement.
            </p>
          </ToolSection>

          <ToolSection title="💡 Exemple">
            <p>
              Avec un fichier de 1 Go et un débit de 100 Mbps, le temps théorique
              est d'environ 1 minute et 20 secondes. En pratique, le résultat peut
              varier selon la qualité de la connexion et la charge du serveur.
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
