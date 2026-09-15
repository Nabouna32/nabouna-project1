import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/fr"
          className="text-xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Utiluna
        </a>

        <nav className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
          <a
            href="/fr/outils"
            className="transition-colors hover:text-[var(--foreground)]"
          >
            Outils
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}