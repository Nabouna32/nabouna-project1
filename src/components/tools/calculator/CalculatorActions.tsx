import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";

type CalculatorActionsProps = {
  showClear: boolean;
  onClear: () => void;
};

export function CalculatorActions({ showClear, onClear }: CalculatorActionsProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  if (!showClear) return null;

  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
      >
        <span aria-hidden="true">↺</span>
        {calculatorText("Effacer", locale)}}
      </button>
    </div>
  );
}
