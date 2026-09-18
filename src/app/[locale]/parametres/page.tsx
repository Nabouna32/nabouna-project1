"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMessages, isLocale, type Locale } from "@/lib/i18n/config";

export default function SettingsPage() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = isLocale(segment) ? segment : "fr";
  const t = getMessages(locale);

  function selectLocale(nextLocale: Locale) {
    document.cookie = `utiluna-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    window.location.assign(`/${nextLocale}/parametres`);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={`/${locale}`} className="text-sm font-medium text-[var(--accent)] hover:underline">
        ← {t.nav.home}
      </Link>

      <div className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">Utiluna</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {t.settings.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--muted)]">
          {t.settings.description}
        </p>
      </div>

      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{t.settings.languageTitle}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{t.settings.languageDescription}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {([
            ["fr", t.settings.french],
            ["en", t.settings.english],
          ] as const).map(([value, label]) => {
            const active = locale === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => selectLocale(value)}
                aria-pressed={active}
                className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-soft)]"
                }`}
              >
                <span>
                  <span className="block font-semibold text-[var(--foreground)]">{label}</span>
                  <span className="mt-0.5 block text-xs uppercase tracking-wider text-[var(--muted)]">{value}</span>
                </span>
                {active && (
                  <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-xs font-semibold text-white">
                    {t.settings.current}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
