"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import {
  convertFileSize,
  SIZE_UNITS,
  type SizeUnit,
} from "@/lib/convertisseur-taille";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";

const UNIT_LABELS: Record<SizeUnit, string> = {
  o: "Octets (o)",
  ko: "Kilo-octets (Ko)",
  mo: "Méga-octets (Mo)",
  go: "Giga-octets (Go)",
  to: "Téra-octets (To)",
};

const UNIT_SHORT_LABELS: Record<SizeUnit, string> = {
  o: "o",
  ko: "Ko",
  mo: "Mo",
  go: "Go",
  to: "To",
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 6,
  }).format(value);
}

export default function FileSizeConverter() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<SizeUnit>("mo");
  const [to, setTo] = useState<SizeUnit>("go");

  const result = useMemo(() => {
    if (value.trim() === "") return null;

    const numericValue = Number(value.replace(",", "."));
    if (!Number.isFinite(numericValue) || numericValue < 0) return null;

    return convertFileSize(numericValue, from, to);
  }, [value, from, to]);

  const clear = () => setValue("");

  return (
    <CalculatorShell>
      <CalculatorActions showClear={value !== ""} onClear={clear} />

      <div className="grid gap-5 sm:grid-cols-2">
        <CalculatorField
          label={calculatorText("Valeur à convertir", locale)}
          inputId="file-size-value"
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ex. 1,5"
        />

        <label
          htmlFor="file-size-from"
          className="block text-sm font-medium text-[var(--foreground)]"
        >
          Unité de départ
          <select
            id="file-size-from"
            value={from}
            onChange={(event) => setFrom(event.target.value as SizeUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {SIZE_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {UNIT_LABELS[unit]}
              </option>
            ))}
          </select>
        </label>

        <label
          htmlFor="file-size-to"
          className="block text-sm font-medium text-[var(--foreground)] sm:col-span-2"
        >
          Unité d'arrivée
          <select
            id="file-size-to"
            value={to}
            onChange={(event) => setTo(event.target.value as SizeUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {SIZE_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {UNIT_LABELS[unit]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6">
        <CalculatorResult
          label={calculatorText("Résultat", locale)}
          value={
            result === null
              ? "—"
              : `${formatNumber(result)} ${UNIT_SHORT_LABELS[to]}`
          }
        />
      </div>
    </CalculatorShell>
  );
}
