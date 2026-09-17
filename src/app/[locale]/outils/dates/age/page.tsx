import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import AgeCalculator from "@/components/tools/age/AgeCalculator";

export const metadata = {
  title: "Calculateur d'âge gratuit | Utiluna",
  description: "Calculez précisément votre âge en années, mois et jours à partir de votre date de naissance.",
};

export default function AgePage() {
  return (
    <ToolPage
      icon="🎂"
      title="Calculateur d'âge"
      description="Calculez précisément votre âge à une date donnée."
      content={
        <>
          <AgeCalculator />
          <RelatedTools toolId="age" />
          <ToolSection title="🎂 Comment calculer son âge ?">
            <p>
              Saisissez votre date de naissance pour obtenir votre âge exact en années, mois et jours.
              Par défaut, le calcul utilise la date du jour, mais vous pouvez choisir une autre date de référence.
            </p>
          </ToolSection>
          <div className="mt-8 flex justify-start">
            <Link href="/fr/outils" className="text-sm font-medium text-[var(--accent)] hover:underline">
              ← Retour aux outils
            </Link>
          </div>
        </>
      }
    />
  );
}
