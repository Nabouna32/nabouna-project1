import ToolSearch from "@/components/tools/ToolSearch";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_50%_0%,var(--accent-soft),transparent_65%)]" />

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm">
          Des outils simples pour le quotidien
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          Trouvez l’outil qu’il vous faut.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          Calculs, conversions, dates, fichiers et bien plus.
          <br className="hidden sm:block" />
          Des outils gratuits, rapides et faciles à utiliser.
        </p>

        <ToolSearch className="mx-auto mt-10 max-w-2xl" />

        <p className="mt-3 text-xs text-[var(--muted)]">
          Essayez : TVA, remise, internet, vidéo, âge...
        </p>
      </div>
    </section>
  );
}
