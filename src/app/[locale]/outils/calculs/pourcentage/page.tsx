import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import PercentageCalculator from "@/components/tools/percentage/PercentageCalculator";

export const metadata = {
  title: "Calculateur de pourcentage gratuit | Utiluna",
  description:
    "Calculez facilement un pourcentage, une augmentation ou une diminution en pourcentage grâce à notre calculateur gratuit.",
};

export default function PercentagePage() {
  return (
    <ToolPage
      toolId="pourcentage"
      content={
        <>
          <PercentageCalculator />

          <RelatedTools toolId="pourcentage" />

          <ToolSection title="🧮 Comment calculer un pourcentage ?">
            <p>
              Un pourcentage permet d'exprimer une proportion par rapport à
              100. Pour calculer un pourcentage d'une valeur, il suffit de
              multiplier cette valeur par le pourcentage puis de diviser le
              résultat par 100.
            </p>

            <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">Formule</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                valeur × pourcentage ÷ 100
              </p>
            </div>

            <p className="mt-5">Par exemple, pour calculer 20 % de 150 :</p>

            <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">
                150 × 20 ÷ 100 = 30
              </p>
              <p className="mt-2 text-sm">
                20 % de 150 correspondent donc à <strong>30</strong>.
              </p>
            </div>
          </ToolSection>

          <ToolSection title="📈 Calculer une augmentation ou une diminution en pourcentage">
            <p>
              Pour mesurer l'évolution d'une valeur, on compare sa nouvelle
              valeur à sa valeur de départ. Le résultat indique le pourcentage
              d'augmentation ou de diminution.
            </p>

            <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">Formule</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                (nouvelle valeur − valeur de départ) ÷ valeur de départ × 100
              </p>
            </div>

            <p className="mt-5">
              Par exemple, si un prix passe de 100 € à 120 €, son évolution
              est de :
            </p>

            <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">
                (120 − 100) ÷ 100 × 100 = +20 %
              </p>
              <p className="mt-2 text-sm">
                Le prix a donc augmenté de <strong>20 %</strong>.
              </p>
            </div>
          </ToolSection>

          <details className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              <span>↔️ Évolution ou différence en pourcentage ?</span>
              <span className="shrink-0 text-xl text-[var(--muted)] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>

            <div className="border-t border-[var(--border)] px-5 pb-5 pt-5 sm:px-6">
              <p>
                Les deux calculs comparent deux valeurs, mais ils ne répondent
                pas à la même question.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    📈 Évolution en pourcentage
                  </h3>
                  <p className="mt-3">
                    L'évolution utilise une valeur de départ comme référence.
                    Elle permet de mesurer une augmentation ou une diminution
                    entre deux moments ou deux états.
                  </p>
                  <div className="mt-4 rounded-xl bg-[var(--surface-soft)] p-4">
                    <p className="font-mono text-sm text-[var(--foreground)]">
                      (120 − 100) ÷ 100 × 100 = 20 %
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    ↔️ Différence en pourcentage
                  </h3>
                  <p className="mt-3">
                    La différence en pourcentage compare deux valeurs sans
                    privilégier une valeur de départ comme référence.
                  </p>
                  <div className="mt-4 rounded-xl bg-[var(--surface-soft)] p-4">
                    <p className="font-mono text-sm text-[var(--foreground)]">
                      |120 − 100| ÷ ((120 + 100) ÷ 2) × 100 ≈ 18,18 %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </details>

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
