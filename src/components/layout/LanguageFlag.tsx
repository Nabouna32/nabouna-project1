import type { LanguageDefinition } from "@/lib/i18n/config";

type LanguageFlagProps = { code: LanguageDefinition["flagCode"] };

export default function LanguageFlag({ code }: LanguageFlagProps) {
  return (
    <span
      className={`fi fi-${code} block h-4 w-6 rounded-[3px] bg-[var(--surface-soft)] bg-contain bg-center bg-no-repeat shadow-[var(--shadow-sm)] transition-transform duration-150 group-hover/language:scale-105`}
      aria-hidden="true"
    />
  );
}
