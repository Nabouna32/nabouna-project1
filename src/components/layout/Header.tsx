import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/fr"
          className="group flex items-center gap-2.5"
          aria-label="Utiluna - Accueil"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            U
          </span>

          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            Utiluna
          </span>
        </a>

        <nav className="flex items-center gap-2 text-sm font-medium">
          <a
            href="/fr/outils"
            className="rounded-xl px-4 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
          >
            Outils
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}