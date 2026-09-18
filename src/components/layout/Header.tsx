"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { getMessages, isLocale } from "@/lib/i18n/config";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : "fr";
  const t = getMessages(locale);

  function switchLocale(nextLocale: "fr" | "en") {
    if (nextLocale === locale) return;
    document.cookie = `utiluna-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    const nextPath = pathname.replace(/^\/[^/]+/, `/${nextLocale}`);
    router.push(nextPath);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5"
          aria-label={`Utiluna - ${t.nav.home}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-105">
            U
          </span>
          <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">
            Utiluna
          </span>
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link
            href={`/${locale}/outils`}
            className="rounded-xl px-4 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]"
          >
            {t.nav.tools}
          </Link>
          <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1" aria-label={t.nav.language}>
            <button type="button" onClick={() => switchLocale("fr")} aria-pressed={locale === "fr"} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${locale === "fr" ? "bg-[var(--accent-soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}>FR</button>
            <button type="button" onClick={() => switchLocale("en")} aria-pressed={locale === "en"} className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${locale === "en" ? "bg-[var(--accent-soft)] text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}`}>EN</button>
          </div>
          <Link href={`/${locale}/parametres`} aria-label={t.nav.settings} title={t.nav.settings} className="rounded-xl px-3 py-2.5 text-[var(--muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]">⚙️</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
