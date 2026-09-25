import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import type { ToolProcessingMetadata } from "@/lib/tools/types";
import { getToolProcessingPresentation } from "@/lib/tools/processing";

export default function ToolProcessingStatus({ processing, locale = "fr" }: { processing: ToolProcessingMetadata; locale?: Locale }) {
  const t = getMessages(locale).processing;
  const presentation = getToolProcessingPresentation(processing, locale);
  const isLocal = processing.mode === "local";

  return (
    <section className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 sm:px-4" aria-label={t.ariaLabel}>
      <div className="flex items-center gap-2.5">
        <span
          className={isLocal ? "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--success-soft)] text-sm" : "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-sm"}
          aria-hidden="true"
        >
          {presentation.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[var(--foreground)] sm:text-sm">{presentation.label}</p>
          <p className="text-xs leading-5 text-[var(--muted)] sm:text-sm">{presentation.summary}</p>
        </div>
        <details className="group shrink-0">
          <summary className="cursor-pointer rounded-xl px-2.5 py-2 text-xs font-bold text-[var(--accent)] outline-none transition-colors hover:bg-[var(--accent-soft)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]">
            <span className="sm:hidden">ⓘ</span><span className="hidden sm:inline">{t.more}</span>
          </summary>
          <div className="absolute left-0 right-0 z-20 mt-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 text-sm leading-6 text-[var(--muted)] shadow-[var(--shadow-lg)] sm:left-auto sm:right-0 sm:w-[30rem]">
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
