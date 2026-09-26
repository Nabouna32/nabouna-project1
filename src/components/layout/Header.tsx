"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";
import LanguageFlag from "@/components/layout/LanguageFlag";
import { getLanguage, isLocale, type Locale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function Header() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale: Locale = isLocale(segment) ? segment : "fr";
  const t = getMessages(locale);
  const switchLocale = locales.find((item) => item !== locale) ?? locale;
  const suffix = pathname.startsWith("/" + locale) ? pathname.slice(locale.length + 1) : "";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]/80 bg-[var(--background)]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={"/" + locale} className="group flex min-w-0 items-center gap-3" aria-label={"Utiluna - " + t.nav.home}>
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] bg-[var(--accent)] text-sm font-black text-white shadow-[var(--shadow-sm)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white/35,transparent_45%)]" />
            <span className="relative">U</span>
          </span>
          <span className="truncate text-xl font-bold tracking-[-0.03em]">Utiluna</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold" aria-label="Primary">
          <Link href={"/" + locale + "/outils"} className="hidden rounded-xl px-4 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)] sm:inline-flex">{t.nav.tools}</Link>
          <Link href={"/" + switchLocale + (suffix || "")} hrefLang={switchLocale} className="group/language rounded-xl px-3 py-2.5 text-xs font-bold tracking-wide text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]" aria-label={t.nav.language + ": " + getLanguage(switchLocale).nativeLabel}>
            <LanguageFlag code={getLanguage(switchLocale).flagCode} />
            <span className="sr-only">{getLanguage(switchLocale).nativeLabel}</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
