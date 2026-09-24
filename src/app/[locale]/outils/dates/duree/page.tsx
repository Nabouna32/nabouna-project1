import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import DurationCalculator from "@/components/tools/duree/DurationCalculator";

export const metadata = {
  title: "Calculateur de durée | Utiluna",
  description: "Calculez facilement une durée entre deux dates ou deux horaires.",
};

export default function DurationCalculatorPage() {
  return (
    <ToolPage
      toolId="duree"
      icon="⏱️"
      title="Calculateur de durée"
      description="Calculez la durée entre deux dates ou deux horaires."
      content={
        <>
          <DurationCalculator />

          <RelatedTools toolId="duree" />

          <ToolSection title="📅 Calculer une durée entre deux dates">
            <p>
              Saisissez une date de début et une date de fin pour connaître le
              nombre de jours, d'heures et de minutes qui les séparent.
            </p>
          </ToolSection>

          <ToolSection title="🕐 Calculer une durée entre deux horaires">
            <p>
              Utilisez le mode horaires pour calculer un intervalle dans une
              même journée. Si l'heure de fin est plus tôt que l'heure de début,
              le calcul considère qu'il s'agit du lendemain.
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
