import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
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
      content={
        <>
          <FileSizeConverter />

          <RelatedTools toolId="convertisseur-taille" />

          <ToolSection title="💾 Comment convertir une taille de fichier ?">
            <p>
              Saisissez une valeur, choisissez son unité de départ puis l’unité
              dans laquelle vous souhaitez obtenir le résultat. Le convertisseur
              utilise des multiples binaires : 1 Ko correspond à 1 024 octets,
              1 Mo à 1 024 Ko et ainsi de suite.
            </p>
          </ToolSection>

          <ToolSection title="💡 Quand utiliser ce convertisseur ?">
            <p>
              Il est pratique pour comparer la taille d’un fichier, vérifier
              l’espace disponible sur un stockage ou comprendre les limites et
              capacités exprimées dans différentes unités.
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
