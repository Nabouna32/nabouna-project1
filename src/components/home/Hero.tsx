import ToolSearch from "@/components/tools/ToolSearch";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <section className="relative z-10 isolate">
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-16 -z-10 h-96 w-96 rounded-full bg-fuchsia-400/8 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-2 text-sm font-semibold text-[var(--muted)] shadow-[var(--shadow-sm)] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            {t.home.badge}
          </div>
          <h1 className="text-balance text-4xl font-black tracking-[-0.045em] text-[var(--foreground)] sm:text-6xl lg:text-7xl">{t.home.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">{t.home.description}</p>
          <ToolSearch className="relative z-40 mx-auto mt-9 max-w-3xl" locale={locale} />
          <p className="mt-4 text-xs font-medium text-[var(--muted)]">{t.home.examples}</p>
        </div>
      </div>

      <a
        href="#categories"
        className="absolute bottom-0 left-1/2 z-20 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-xs font-bold text-[var(--foreground)] shadow-[var(--shadow-md)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-x-1/2 hover:translate-y-[calc(50%-2px)] hover:border-[var(--accent)]/40 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        aria-label={t.home.explore}
      >
        <span>{t.home.explore}</span>
        <span className="text-[var(--accent)]" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
