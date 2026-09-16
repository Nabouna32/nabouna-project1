import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import ReductionCalculator from "@/components/tools/reduction/ReductionCalculator";

export const metadata = {
  title: "Calculateur de réduction gratuit | Utiluna",
  description:
    "Calculez le prix après une réduction et le montant économisé grâce à notre calculateur gratuit.",
};

export default function ReductionPage() {
  return (
    <ToolPage
      icon="🏷️"
      title="Calculateur de réduction"
      description="Calculez rapidement le prix après une remise et le montant économisé."
      content={
        <>
          <ReductionCalculator />

          <ToolSection title="🏷️ Comment calculer une réduction ?">
            <p>
              Pour calculer une réduction, on commence par déterminer le montant
              de la remise, puis on le soustrait au prix initial.
            </p>

            <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">Formules</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                réduction = prix × pourcentage ÷ 100
              </p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                prix final = prix − réduction
              </p>
            </div>

            <p className="mt-5">Par exemple, pour un article à 150 € avec 20 % de réduction :</p>

            <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">
                150 × 20 ÷ 100 = 30 €
              </p>
              <p className="mt-2 text-sm">
                La remise est donc de <strong>30 €</strong>, et le prix après réduction est de <strong>120 €</strong>.
              </p>
            </div>
          </ToolSection>

          <ToolSection title="💡 Réduction et prix final">
            <p>
              Une réduction de 20 % ne signifie pas que le prix final représente
              20 % du prix initial. Elle signifie que 20 % du prix initial sont
              retirés. Le prix final représente donc 80 % du prix de départ.
            </p>
          </ToolSection>

          <RelatedTools toolId="reduction" />

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
