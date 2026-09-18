import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import AgeCalculator from "@/components/tools/age/AgeCalculator";

export const metadata = {
  title: "Calculateur d'âge | Utiluna",
  description: "Calculez précisément votre âge en années, mois et jours.",
};

export default function AgeCalculatorPage() {
  return (
    <ToolPage
      icon="🎂"
      title="Calculateur d'âge"
      description="Calculez votre âge précis à partir de votre date de naissance."
      content={
        <>
          <AgeCalculator />

          <RelatedTools toolId="age" />

          <ToolSection title="📅 Comment calculer son âge ?">
            <p>
              Saisissez votre date de naissance puis la date à laquelle vous
              souhaitez calculer votre âge. Le résultat indique le nombre
              d'années, de mois et de jours écoulés entre ces deux dates.
            </p>
          </ToolSection>

          <ToolSection title="💡 À quoi sert ce calcul ?">
            <p>
              Le calculateur peut servir à connaître un âge exact pour une
              démarche administrative, vérifier un âge à une date donnée ou
              simplement connaître la durée écoulée depuis une naissance.
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
