"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { isLocale, type Locale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function Header() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale: Locale = isLocale(segment) ? segment : "fr";
  const t = getMessages(locale);
  const switchLocale = locales.find((item) => item !== locale) ?? locale;
  const suffix = pathname.startsWith("/" + locale) ? pathname.slice(locale.length + 1) : "";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={"/" + locale} className="group flex items-center gap-2.5" aria-label={"Utiluna - " + t.nav.home}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">U</span>
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">Utiluna</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link href={"/" + locale + "/outils"} className="rounded-xl px-4 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]">
            {t.nav.tools}
          </Link>
          <Link
            href={"/" + switchLocale + (suffix || "")}
            hrefLang={switchLocale}
            className="rounded-xl px-3 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
            aria-label={t.nav.language + ": " + switchLocale}
          >
            {switchLocale.toUpperCase()}
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
