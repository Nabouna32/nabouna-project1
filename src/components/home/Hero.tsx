export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_50%_0%,var(--accent-soft),transparent_65%)]" />

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm">
          Des outils simples pour le quotidien
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
          Trouvez l'outil qu'il vous faut.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          Calculs, conversions, dates, fichiers et bien plus.
          <br className="hidden sm:block" />
          Des outils gratuits, rapides et faciles à utiliser.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <label htmlFor="tool-search" className="sr-only">
            Rechercher un outil
          </label>

          <div className="flex items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg shadow-black/5 transition-shadow focus-within:ring-2 focus-within:ring-[var(--accent)]">
            <span className="px-3 text-xl text-[var(--muted)]" aria-hidden="true">
              🔍
            </span>

            <input
              id="tool-search"
              type="search"
              placeholder="Que recherchez-vous ?"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
            />

            <button
              type="button"
              className="hidden rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
            >
              Rechercher
            </button>
          </div>

          <p className="mt-3 text-xs text-[var(--muted)]">
            Exemple : TVA, pourcentage, âge, vitesse de téléchargement...
          </p>
        </div>
      </div>
    </section>
  );
}