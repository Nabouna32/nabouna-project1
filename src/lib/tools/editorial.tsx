import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import ToolSection from "@/components/tools/ToolPage/ToolSection";

function BackToTools({ locale }: { locale: Locale }) {
  return (
    <div className="mt-8 flex justify-start">
      <Link
        href={`/${locale}/outils`}
        className="text-sm font-medium text-[var(--accent)] hover:underline"
      >
        {locale === "fr" ? "← Retour aux outils" : "← Back to all tools"}
      </Link>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="mt-4 rounded-2xl bg-[var(--accent-soft)] p-5">{children}</div>;
}

function Formula({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
      {children}
    </div>
  );
}

export function getToolEditorial(toolId: string, locale: Locale): ReactNode {
  const fr = locale === "fr";

  switch (toolId) {
    case "pourcentage":
      return (
        <>
          <ToolSection title={fr ? "🧮 Comment calculer un pourcentage ?" : "🧮 How do you calculate a percentage?"}>
            <p>
              {fr
                ? "Un pourcentage permet d'exprimer une proportion par rapport à 100. Pour calculer un pourcentage d'une valeur, il suffit de multiplier cette valeur par le pourcentage puis de diviser le résultat par 100."
                : "A percentage expresses a proportion out of 100. To calculate a percentage of a value, multiply the value by the percentage and divide the result by 100."}
            </p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Formule" : "Formula"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">value × percentage ÷ 100</p>
            </Formula>
            <p className="mt-5">{fr ? "Par exemple, pour calculer 20 % de 150 :" : "For example, to calculate 20% of 150:"}</p>
            <Card>
              <p className="font-semibold text-[var(--foreground)]">150 × 20 ÷ 100 = 30</p>
              <p className="mt-2 text-sm">
                {fr ? <>20 % de 150 correspondent donc à <strong>30</strong>.</> : <>20% of 150 is therefore <strong>30</strong>.</>}
              </p>
            </Card>
          </ToolSection>
          <ToolSection title={fr ? "📈 Calculer une augmentation ou une diminution en pourcentage" : "📈 Calculate a percentage increase or decrease"}>
            <p>
              {fr
                ? "Pour mesurer l'évolution d'une valeur, on compare sa nouvelle valeur à sa valeur de départ. Le résultat indique le pourcentage d'augmentation ou de diminution."
                : "To measure how a value changes, compare its new value with its starting value. The result gives the percentage increase or decrease."}
            </p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Formule" : "Formula"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">
                (new value − starting value) ÷ starting value × 100
              </p>
            </Formula>
            <p className="mt-5">
              {fr ? "Par exemple, si un prix passe de 100 € à 120 €, son évolution est de :" : "For example, if a price goes from €100 to €120, its change is:"}
            </p>
            <Card>
              <p className="font-semibold text-[var(--foreground)]">(120 − 100) ÷ 100 × 100 = +20 %</p>
              <p className="mt-2 text-sm">
                {fr ? <>Le prix a donc augmenté de <strong>20 %</strong>.</> : <>The price therefore increased by <strong>20%</strong>.</>}
              </p>
            </Card>
          </ToolSection>
          <details className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-xl font-bold text-[var(--foreground)] sm:text-2xl">
              <span>{fr ? "↔️ Évolution ou différence en pourcentage ?" : "↔️ Percentage change or percentage difference?"}</span>
              <span className="shrink-0 text-xl text-[var(--muted)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="border-t border-[var(--border)] px-5 pb-5 pt-5 sm:px-6">
              <p>
                {fr
                  ? "Les deux calculs comparent deux valeurs, mais ils ne répondent pas à la même question."
                  : "Both calculations compare two values, but they answer different questions."}
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">{fr ? "📈 Évolution en pourcentage" : "📈 Percentage change"}</h3>
                  <p className="mt-3">
                    {fr
                      ? "L'évolution utilise une valeur de départ comme référence. Elle permet de mesurer une augmentation ou une diminution entre deux moments ou deux états."
                      : "Percentage change uses a starting value as its reference. It measures an increase or decrease between two points in time or two states."}
                  </p>
                  <div className="mt-4 rounded-xl bg-[var(--surface-soft)] p-4">
                    <p className="font-mono text-sm text-[var(--foreground)]">(120 − 100) ÷ 100 × 100 = 20 %</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
                  <h3 className="font-semibold text-[var(--foreground)]">{fr ? "↔️ Différence en pourcentage" : "↔️ Percentage difference"}</h3>
                  <p className="mt-3">
                    {fr
                      ? "La différence en pourcentage compare deux valeurs sans privilégier une valeur de départ comme référence."
                      : "Percentage difference compares two values without choosing either one as the starting reference."}
                  </p>
                  <div className="mt-4 rounded-xl bg-[var(--surface-soft)] p-4">
                    <p className="font-mono text-sm text-[var(--foreground)]">|120 − 100| ÷ ((120 + 100) ÷ 2) × 100 ≈ 18.18 %</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
          <BackToTools locale={locale} />
        </>
      );

    case "reduction":
      return (
        <>
          <ToolSection title={fr ? "🏷️ Comment calculer une réduction ?" : "🏷️ How do you calculate a discount?"}>
            <p>{fr ? "Pour calculer une réduction, on commence par déterminer le montant de la remise, puis on le soustrait au prix initial." : "To calculate a discount, first determine the discount amount, then subtract it from the original price."}</p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Formules" : "Formulas"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">discount = price × percentage ÷ 100</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">final price = price − discount</p>
            </Formula>
            <p className="mt-5">{fr ? "Par exemple, pour un article à 150 € avec 20 % de réduction :" : "For example, for an item costing €150 with a 20% discount:"}</p>
            <Card>
              <p className="font-semibold text-[var(--foreground)]">150 × 20 ÷ 100 = 30 €</p>
              <p className="mt-2 text-sm">{fr ? <>La remise est donc de <strong>30 €</strong>, et le prix après réduction est de <strong>120 €</strong>.</> : <>The discount is <strong>€30</strong>, so the price after the discount is <strong>€120</strong>.</>}</p>
            </Card>
          </ToolSection>
          <ToolSection title={fr ? "💡 Réduction et prix final" : "💡 Discount and final price"}>
            <p>{fr ? <>Une réduction de 20 % ne signifie pas que le prix final représente 20 % du prix initial. Elle signifie que 20 % du prix initial sont retirés. Le prix final représente donc 80 % du prix de départ.</> : <>A 20% discount does not mean that the final price is 20% of the original price. It means that 20% of the original price is removed. The final price therefore represents 80% of the starting price.</>}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "tva":
      return (
        <>
          <ToolSection title={fr ? "💶 Comment calculer la TVA ?" : "💶 How do you calculate VAT?"}>
            <p>{fr ? <>Pour passer d&apos;un prix HT à un prix TTC, on ajoute la TVA au prix hors taxes. Pour retrouver le prix HT à partir d&apos;un prix TTC, on retire la TVA en divisant par 1 + le taux de TVA.</> : <>To convert a net price to a gross price, add VAT to the net amount. To find the net price from a gross price, divide by 1 + the VAT rate.</>}</p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Formules" : "Formulas"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">Gross = Net × (1 + rate ÷ 100)</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">Net = Gross ÷ (1 + rate ÷ 100)</p>
            </Formula>
            <p className="mt-5">{fr ? "Par exemple, avec 100 € HT et une TVA de 20 % :" : "For example, with €100 net and 20% VAT:"}</p>
            <Card>
              <p className="font-semibold text-[var(--foreground)]">100 × 1.20 = 120 €</p>
              <p className="mt-2 text-sm">{fr ? <>La TVA est donc de <strong>20 €</strong> et le prix toutes taxes comprises est de <strong>120 €</strong>.</> : <>VAT is therefore <strong>€20</strong> and the gross price is <strong>€120</strong>.</>}</p>
            </Card>
          </ToolSection>
          <ToolSection title={fr ? "💡 HT, TTC et TVA" : "💡 Net, gross, and VAT"}>
            <p>{fr ? <>Le prix <strong>HT</strong> correspond au prix hors taxes. La <strong>TVA</strong> est la taxe ajoutée selon un taux donné. Le prix <strong>TTC</strong> correspond au prix payé après ajout de cette taxe.</> : <>The <strong>net</strong> price is the amount before tax. <strong>VAT</strong> is the tax added at a given rate. The <strong>gross</strong> price is the amount paid after adding that tax.</>}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "regle-de-trois":
      return (
        <>
          <ToolSection title={fr ? "⚖️ Comment fonctionne la règle de trois ?" : "⚖️ How does the rule of three work?"}>
            <p>{fr ? <>La règle de trois permet de trouver une valeur inconnue lorsque deux grandeurs sont proportionnelles. Si A correspond à B et C correspond à X, alors X se calcule ainsi :</> : <>The rule of three finds an unknown value when two quantities are proportional. If A corresponds to B and C corresponds to X, then X is calculated as follows:</>}</p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Formule" : "Formula"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">X = B × C ÷ A</p>
            </Formula>
            <p className="mt-5">{fr ? "Par exemple, si 4 articles coûtent 10 €, alors 6 articles coûtent 15 € lorsque le prix unitaire reste proportionnel." : "For example, if 4 items cost €10, then 6 items cost €15 when the unit price remains proportional."}</p>
            <Card>
              <p className="font-semibold text-[var(--foreground)]">10 × 6 ÷ 4 = 15</p>
              <p className="mt-2 text-sm">{fr ? <>Le résultat est donc de <strong>15 €</strong>.</> : <>The result is therefore <strong>€15</strong>.</>}</p>
            </Card>
          </ToolSection>
          <ToolSection title={fr ? "💡 Quand utiliser une règle de trois ?" : "💡 When should you use the rule of three?"}>
            <p>{fr ? "Elle est utile pour les conversions proportionnelles, les prix, les quantités, les recettes, les distances ou tout autre calcul où le rapport entre deux grandeurs reste constant." : "It is useful for proportional conversions involving prices, quantities, recipes, distances, or any other calculation where the ratio between two quantities remains constant."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "age":
      return (
        <>
          <ToolSection title={fr ? "📅 Comment calculer son âge ?" : "📅 How do you calculate your age?"}>
            <p>{fr ? "Saisissez votre date de naissance puis la date à laquelle vous souhaitez calculer votre âge. Le résultat indique le nombre d'années, de mois et de jours écoulés entre ces deux dates." : "Enter your birth date and the date for which you want to calculate your age. The result shows the number of years, months, and days between those two dates."}</p>
          </ToolSection>
          <ToolSection title={fr ? "💡 À quoi sert ce calcul ?" : "💡 What is this calculation useful for?"}>
            <p>{fr ? "Le calculateur peut servir à connaître un âge exact pour une démarche administrative, vérifier un âge à une date donnée ou simplement connaître la durée écoulée depuis une naissance." : "The calculator can help determine an exact age for an administrative process, check an age on a given date, or simply find the time elapsed since a birth."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "duree":
      return (
        <>
          <ToolSection title={fr ? "📅 Calculer une durée entre deux dates" : "📅 Calculate a duration between two dates"}>
            <p>{fr ? "Saisissez une date de début et une date de fin pour connaître le nombre de jours, d'heures et de minutes qui les séparent." : "Enter a start date and an end date to find the number of days, hours, and minutes between them."}</p>
          </ToolSection>
          <ToolSection title={fr ? "🕐 Calculer une durée entre deux horaires" : "🕐 Calculate a duration between two times"}>
            <p>{fr ? "Utilisez le mode horaires pour calculer un intervalle dans une même journée. Si l'heure de fin est plus tôt que l'heure de début, le calcul considère qu'il s'agit du lendemain." : "Use time mode to calculate an interval within a day. If the end time is earlier than the start time, the calculation treats it as the following day."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "convertisseur-taille":
      return (
        <>
          <ToolSection title={fr ? "💾 Comment convertir une taille de fichier ?" : "💾 How do you convert a file size?"}>
            <p>{fr ? "Saisissez une valeur, choisissez son unité de départ puis l’unité dans laquelle vous souhaitez obtenir le résultat. Le convertisseur utilise des multiples binaires : 1 Ko correspond à 1 024 octets, 1 Mo à 1 024 Ko et ainsi de suite." : "Enter a value, choose its starting unit, then choose the unit for the result. The converter uses binary multiples: 1 KB equals 1,024 bytes, 1 MB equals 1,024 KB, and so on."}</p>
          </ToolSection>
          <ToolSection title={fr ? "💡 Quand utiliser ce convertisseur ?" : "💡 When should you use this converter?"}>
            <p>{fr ? "Il est pratique pour comparer la taille d’un fichier, vérifier l’espace disponible sur un stockage ou comprendre les limites et capacités exprimées dans différentes unités." : "It is useful for comparing file sizes, checking available storage space, or understanding limits and capacities expressed in different units."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "temps-telechargement":
      return (
        <>
          <ToolSection title={fr ? "📥 Comment calculer un temps de téléchargement ?" : "📥 How do you calculate a download time?"}>
            <p>{fr ? "Indiquez la taille du fichier et votre vitesse de téléchargement. Le calcul estime le temps nécessaire en supposant que le débit reste constant pendant tout le téléchargement." : "Enter the file size and your download speed. The calculation estimates the required time assuming the transfer rate remains constant throughout the download."}</p>
          </ToolSection>
          <ToolSection title={fr ? "💡 Exemple" : "💡 Example"}>
            <p>{fr ? "Avec un fichier de 1 Go et un débit de 100 Mbps, le temps théorique est d'environ 1 minute et 20 secondes. En pratique, le résultat peut varier selon la qualité de la connexion et la charge du serveur." : "With a 1 GB file and a 100 Mbps connection, the theoretical time is about 1 minute and 20 seconds. In practice, the result may vary depending on connection quality and server load."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "vitesse-telechargement":
      return (
        <>
          <ToolSection title={fr ? "📐 Comment convertir un débit Internet ?" : "📐 How do you convert an Internet speed?"}>
            <p>{fr ? "Saisissez une vitesse, choisissez son unité de départ puis l’unité souhaitée. Les conversions utilisent les unités décimales : 1 Mbps = 1 000 000 bits/s et 1 Mo/s = 1 000 000 octets/s. Comme 1 octet vaut 8 bits, 100 Mbps correspondent à 12,5 Mo/s." : "Enter a speed, choose its starting unit, then choose the desired unit. Conversions use decimal units: 1 Mbps = 1,000,000 bits/s and 1 MB/s = 1,000,000 bytes/s. Since 1 byte equals 8 bits, 100 Mbps equals 12.5 MB/s."}</p>
          </ToolSection>
          <ToolSection title={fr ? "💡 Pourquoi convertir Mbps en Mo/s ?" : "💡 Why convert Mbps to MB/s?"}>
            <p>{fr ? "Les fournisseurs d’accès indiquent généralement les débits en mégabits par seconde (Mbps), tandis que les logiciels de téléchargement affichent souvent les vitesses en mégaoctets par seconde (Mo/s). Cette conversion permet de comparer les deux valeurs plus facilement." : "Internet providers usually report speeds in megabits per second (Mbps), while download software often displays speeds in megabytes per second (MB/s). This conversion makes the two values easier to compare."}</p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "taille-fichier":
      return (
        <>
          <ToolSection title={fr ? "💾 Comment estimer une taille de fichier ?" : "💾 How do you estimate a file size?"}>
            <p>
              {fr
                ? "Indiquez la durée du contenu et son débit binaire. Le calcul convertit la durée en secondes, multiplie par le débit et exprime le résultat dans l'unité de stockage choisie."
                : "Enter the content duration and its bitrate. The calculation converts the duration to seconds, multiplies it by the bitrate, and expresses the result in the selected storage unit."}
            </p>
            <Formula>
              <p className="font-semibold text-[var(--foreground)]">{fr ? "Principe" : "Principle"}</p>
              <p className="mt-2 font-mono text-sm text-[var(--foreground)]">file size = duration × bitrate ÷ 8</p>
            </Formula>
          </ToolSection>
          <ToolSection title={fr ? "💡 Exemple" : "💡 Example"}>
            <p>
              {fr
                ? "Pour 10 minutes à 8 Mbit/s, la taille théorique est d'environ 600 Mo. Le résultat est une estimation : un fichier réel peut contenir des données supplémentaires ou utiliser une compression variable."
                : "For 10 minutes at 8 Mbps, the theoretical size is about 600 MB. This is an estimate: a real file may contain additional data or use variable compression."}
            </p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    case "mots-caracteres":
      return (
        <>
          <ToolSection title={fr ? "🔤 Que compte cet outil ?" : "🔤 What does this tool count?"}>
            <p>
              {fr
                ? "Saisissez ou collez un texte pour obtenir instantanément le nombre de mots, de caractères, de caractères sans espaces, d'espaces et de lignes."
                : "Enter or paste text to instantly count words, characters, characters without spaces, spaces, and lines."}
            </p>
          </ToolSection>
          <ToolSection title={fr ? "💡 À quoi peut-il servir ?" : "💡 What is it useful for?"}>
            <p>
              {fr
                ? "Il peut aider à respecter une limite de caractères, préparer une publication, vérifier la longueur d'un texte ou contrôler rapidement un contenu avant de l'envoyer."
                : "It can help meet a character limit, prepare a post, check text length, or quickly review content before sending it."}
            </p>
          </ToolSection>
          <BackToTools locale={locale} />
        </>
      );

    default:
      return null;
  }
}
