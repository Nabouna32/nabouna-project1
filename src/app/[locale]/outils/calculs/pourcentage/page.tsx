import ToolPage from "@/components/tools/ToolPage/ToolPage";
import PercentageCalculator from "@/components/tools/percentage/PercentageCalculator";

export const metadata = {
  title: "Calculateur de pourcentage gratuit | Utiluna",
  description:
    "Calculez facilement un pourcentage, une valeur en pourcentage ou une évolution en quelques secondes.",
};

export default function PercentagePage() {
  return (
    <ToolPage
      icon="📊"
      title="Calculateur de pourcentage"
      description="Calculez facilement un pourcentage d'une valeur, sans calcul compliqué."
    >
      <PercentageCalculator />
    </ToolPage>
  );
}