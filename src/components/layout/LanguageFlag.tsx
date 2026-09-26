import type { LanguageDefinition } from "@/lib/i18n/config";

type LanguageFlagProps = {
  code: LanguageDefinition["flagCode"];
};

export default function LanguageFlag({ code }: LanguageFlagProps) {
  return (
    <span
      className={`language-flag fi fi-${code} block h-4 w-6 shrink-0 rounded-[3px] bg-[var(--surface-soft)] bg-contain bg-center bg-no-repeat shadow-[var(--shadow-sm)] transition-transform duration-150`}
      aria-hidden="true"
    />
  );
}
