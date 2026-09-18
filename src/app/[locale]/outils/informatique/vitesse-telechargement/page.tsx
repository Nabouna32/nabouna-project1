import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import DownloadSpeedConverter from "@/components/tools/vitesse-telechargement/DownloadSpeedConverter";

export const metadata = {
  title: "Convertisseur Mbps Mo/s | Utiluna",
  description:
    "Convertissez une vitesse Internet entre Mbps, Gbps, Ko/s, Mo/s et Go/s.",
};

export default function DownloadSpeedConverterPage() {
  return (
    <ToolPage
      icon="🚀"
      title="Mbps ↔ Mo/s"
      description="Convertissez facilement une vitesse Internet entre bits et octets par seconde."
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
              href="../.."
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
