import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import RuleOfThreeCalculator from "@/components/tools/regle-de-trois/RuleOfThreeCalculator";

export const metadata = {
  title: "Règle de trois en ligne | Utiluna",
  description:
    "Résolvez rapidement un calcul de proportionnalité avec notre calculateur de règle de trois gratuit.",
};

export default function RuleOfThreePage() {
  return (
    <ToolPage
      toolId="regle-de-trois"
      content={
        <>
          <RuleOfThreeCalculator />

          <RelatedTools toolId="regle-de-trois" />

          <ToolSection title="⚖️ Comment fonctionne la règle de trois ?">
            <p>
              La règle de trois permet de trouver une valeur inconnue lorsque
              deux grandeurs sont proportionnelles. Si A correspond à B et C
              correspond à X, alors X se calcule ainsi :
            </p>

            <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">Formule</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                X = B × C ÷ A
              </p>
            </div>

            <p className="mt-5">
              Par exemple, si 4 articles coûtent 10 €, alors 6 articles coûtent
              15 € lorsque le prix unitaire reste proportionnel.
            </p>

            <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">
                10 × 6 ÷ 4 = 15
              </p>
              <p className="mt-2 text-sm">
                Le résultat est donc de <strong>15 €</strong>.
              </p>
            </div>
          </ToolSection>

          <ToolSection title="💡 Quand utiliser une règle de trois ?">
            <p>
              Elle est utile pour les conversions proportionnelles, les prix,
              les quantités, les recettes, les distances ou tout autre calcul
              où le rapport entre deux grandeurs reste constant.
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
