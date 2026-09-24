import Link from "next/link";
import ToolPage from "@/components/tools/ToolPage/ToolPage";
import ToolSection from "@/components/tools/ToolPage/ToolSection";
import RelatedTools from "@/components/tools/RelatedTools";
import FileSizeConverter from "@/components/tools/convertisseur-taille/FileSizeConverter";

export const metadata = {
  title: "Convertisseur de taille de fichier | Utiluna",
  description:
    "Convertissez facilement une taille de fichier entre octets, Ko, Mo, Go et To.",
};

export default function FileSizeConverterPage() {
  return (
    <ToolPage
      toolId="convertisseur-taille"
      content={
        <>
          <FileSizeConverter />

          <RelatedTools toolId="convertisseur-taille" />

          <ToolSection title="💾 Comment convertir une taille de fichier ?">
            <p>
              Saisissez une valeur, choisissez son unité de départ puis l’unité
              dans laquelle vous souhaitez obtenir le résultat. Le convertisseur
              utilise des multiples binaires : 1 Ko correspond à 1 024 octets,
              1 Mo à 1 024 Ko et ainsi de suite.
            </p>
          </ToolSection>

          <ToolSection title="💡 Quand utiliser ce convertisseur ?">
            <p>
              Il est pratique pour comparer la taille d’un fichier, vérifier
              l’espace disponible sur un stockage ou comprendre les limites et
              capacités exprimées dans différentes unités.
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
