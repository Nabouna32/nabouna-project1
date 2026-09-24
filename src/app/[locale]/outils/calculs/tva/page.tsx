import { notFound } from "next/navigation";
import Link from "next/link";
import { isLocale } from "@/lib/i18n/config";
import { getToolPageMetadata } from "@/lib/tools/page-metadata";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import TVACalculator from "@/components/tools/tva/TVACalculator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return getToolPageMetadata("tva", locale);
}

export default async function TVAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ToolPage
      locale={locale}
      toolId="tva"
      content={
        <>
          <TVACalculator />

          <RelatedTools toolId="tva" />

          <ToolSection title="💶 Comment calculer la TVA ?">
            <p>
              Pour passer d&apos;un prix HT à un prix TTC, on ajoute la TVA au prix hors taxes.
              Pour retrouver le prix HT à partir d&apos;un prix TTC, on retire la TVA en divisant
              par 1 + le taux de TVA.
            </p>

            <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">Formules</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                TTC = HT × (1 + taux ÷ 100)
              </p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                HT = TTC ÷ (1 + taux ÷ 100)
              </p>
            </div>

            <p className="mt-5">Par exemple, avec 100 € HT et une TVA de 20 % :</p>

            <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">
              <p className="font-semibold text-[var(--foreground)]">100 × 1,20 = 120 € TTC</p>
              <p className="mt-2 text-sm">
                La TVA est donc de <strong>20 €</strong> et le prix toutes taxes comprises est de <strong>120 €</strong>.
              </p>
            </div>
          </ToolSection>

          <ToolSection title="💡 HT, TTC et TVA">
            <p>
              Le prix <strong>HT</strong> correspond au prix hors taxes. La <strong>TVA</strong> est
              la taxe ajoutée selon un taux donné. Le prix <strong>TTC</strong> correspond au prix
              payé après ajout de cette taxe.
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
