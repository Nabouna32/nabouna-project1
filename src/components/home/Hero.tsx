import ToolSearch from "@/components/tools/ToolSearch";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_50%_0%,var(--accent-soft),transparent_65%)]" />
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--muted)] shadow-sm">{t.home.badge}</div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">{t.home.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          {t.home.description}
          <br className="hidden sm:block" />
          {locale === "fr" ? "Des outils gratuits, rapides et faciles à utiliser." : "Free, fast, and easy-to-use tools."}
        </p>
        <ToolSearch className="relative z-40 mx-auto mt-10 max-w-2xl" locale={locale} />
        <p className="mt-3 text-xs text-[var(--muted)]">{t.home.examples}</p>
      </div>
    </section>
  );
}
