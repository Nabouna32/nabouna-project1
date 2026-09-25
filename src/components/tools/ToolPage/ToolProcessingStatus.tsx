import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import type { ToolProcessingMetadata } from "@/lib/tools/types";
import { getToolProcessingPresentation } from "@/lib/tools/processing";

export default function ToolProcessingStatus({ processing, locale = "fr" }: { processing: ToolProcessingMetadata; locale?: Locale }) {
  const t = getMessages(locale).processing;
  const presentation = getToolProcessingPresentation(processing, locale);
  const isLocal = processing.mode === "local";

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-sm)] sm:px-5" aria-label={t.ariaLabel}>
      <div className="flex items-center gap-3">
        <span className={isLocal ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--success-soft)] text-base" : "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-base"} aria-hidden="true">
          {presentation.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-[var(--foreground)]">{presentation.label}</p>
          <p className="mt-0.5 truncate text-sm text-[var(--muted)]">{presentation.summary}</p>
        </div>
        <details className="group shrink-0">
          <summary className="cursor-pointer rounded-xl px-3 py-2 text-xs font-bold text-[var(--accent)] outline-none transition-colors hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
            <span className="sm:hidden">ⓘ</span><span className="hidden sm:inline">{t.more}</span>
          </summary>
          <div className="absolute left-4 right-4 z-20 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)] shadow-[var(--shadow-lg)] sm:left-auto sm:right-6 sm:w-[30rem]">
            <p className="text-[var(--foreground)]">{processing.fallback}</p>
            <div className="mt-3 grid gap-2 border-t border-[var(--border)] pt-3 sm:grid-cols-2">
              <p>{t.storage}: <strong className="text-[var(--foreground)]">{processing.storage}</strong></p>
              <p>{t.retention}: <strong className="text-[var(--foreground)]">{processing.retention}</strong></p>
              {processing.externalProviders.length > 0 && <p className="sm:col-span-2">{t.externalProviders}: <strong className="text-[var(--foreground)]">{processing.externalProviders.join(", ")}</strong></p>}
              {processing.dataCategories.length > 0 && <p className="sm:col-span-2">{t.dataCategories}: <strong className="text-[var(--foreground)]">{processing.dataCategories.join(", ")}</strong></p>}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
