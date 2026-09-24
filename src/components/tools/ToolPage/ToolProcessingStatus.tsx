import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import type { ToolProcessingMetadata } from "@/lib/tools/types";
import { getToolProcessingPresentation } from "@/lib/tools/processing";

export default function ToolProcessingStatus({ processing, locale = "fr" }: { processing: ToolProcessingMetadata; locale?: Locale }) {
  const t = getMessages(locale).processing;
  const presentation = getToolProcessingPresentation(processing, locale);
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 sm:p-5" aria-label={t.ariaLabel}>
      <div className="flex items-start gap-3">
        <span className="text-xl" aria-hidden="true">{presentation.icon}</span>
        <div className="min-w-0">
          <p className="font-semibold text-[var(--foreground)]">{presentation.label}</p>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{presentation.summary}</p>
        </div>
      </div>
      <details className="group mt-3">
        <summary className="cursor-pointer text-sm font-medium text-[var(--accent)]">{t.more}</summary>
        <div className="mt-3 border-t border-[var(--border)] pt-3 text-sm leading-6 text-[var(--muted)]">
          <p>{processing.fallback}</p>
          <p className="mt-2">{t.storage}: <strong className="text-[var(--foreground)]">{processing.storage}</strong>.</p>
          <p className="mt-2">{t.retention}: <strong className="text-[var(--foreground)]">{processing.retention}</strong></p>
          {processing.externalProviders.length > 0 && <p className="mt-2">{t.externalProviders}: <strong className="text-[var(--foreground)]">{processing.externalProviders.join(", ")}</strong></p>}
          {processing.dataCategories.length > 0 && <p className="mt-2">{t.dataCategories}: <strong className="text-[var(--foreground)]">{processing.dataCategories.join(", ")}</strong></p>}
        </div>
      </details>
    </section>
  );
}
