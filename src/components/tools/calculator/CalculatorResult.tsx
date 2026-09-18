import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";

import type { ReactNode } from "react";

type CalculatorResultProps = {
  label: string;
  value: ReactNode;
  tone?: "accent" | "neutral";
};

export function CalculatorResult({
  label,
  value,
  tone = "neutral",
}: CalculatorResultProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const toneClass =
    tone === "accent"
      ? "border-[var(--accent)]/20 bg-[var(--accent-soft)]"
      : "border-[var(--border)] bg-[var(--background)]";

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <p className="text-sm font-medium text-[var(--muted)]">{calculatorText(label, locale)}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
        {value}
      </p>
    </div>
  );
}
