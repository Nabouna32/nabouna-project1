import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";

import type { InputHTMLAttributes } from "react";

type CalculatorFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  inputId: string;
  unit?: string;
};

export function CalculatorField({
  label,
  inputId,
  unit,
  className = "",
  type = "number",
  inputMode,
  ...inputProps
}: CalculatorFieldProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const resolvedInputMode = inputMode ?? (type === "number" ? "decimal" : undefined);

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-[var(--foreground)]"
      >
        {calculatorText(label, locale)}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          inputMode={resolvedInputMode}
          step={type === "number" ? "any" : undefined}
          {...inputProps}
          className={`w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 ${unit ? "pr-12" : ""} ${className}`}
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
