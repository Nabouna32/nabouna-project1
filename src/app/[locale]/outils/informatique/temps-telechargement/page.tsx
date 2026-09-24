import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import DownloadTimeCalculator from "@/components/tools/temps-telechargement/DownloadTimeCalculator";

export const metadata = {
  title: "Temps de téléchargement | Utiluna",
  description: "Estimez le temps nécessaire pour télécharger un fichier selon sa taille et votre débit.",
};

export default function DownloadTimeCalculatorPage() {
  return (
    <ToolPage
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
