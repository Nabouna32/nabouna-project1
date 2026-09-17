"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import { calculateAge } from "@/lib/age";

function formatAge(value: number, singular: string): string {
  return `${value} ${value === 1 ? singular : `${singular}s`}`;
}

export default function AgeCalculator() {
  const [birthDateValue, setBirthDateValue] = useState("");
  const [referenceDateValue, setReferenceDateValue] = useState(new Date().toISOString().slice(0, 10));

  const age = useMemo(() => {
    if (!birthDateValue || !referenceDateValue) return null;
    return calculateAge(
      new Date(`${birthDateValue}T12:00:00`),
      new Date(`${referenceDateValue}T12:00:00`),
    );
  }, [birthDateValue, referenceDateValue]);

  function clearValues() {
    setBirthDateValue("");
    setReferenceDateValue(new Date().toISOString().slice(0, 10));
  }

  return (
    <CalculatorShell>
      <CalculatorActions showClear={birthDateValue !== ""} onClear={clearValues} />

      <div className="mt-2 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
          Date de naissance
          <input
            id="age-birth-date"
            type="date"
            value={birthDateValue}
            max={referenceDateValue}
            onChange={(event) => setBirthDateValue(event.target.value)}
            className="min-h-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 text-base font-normal outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[var(--foreground)]">
          Calculer au
          <input
            id="age-reference-date"
            type="date"
            value={referenceDateValue}
            onChange={(event) => setReferenceDateValue(event.target.value)}
            className="min-h-12 rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 text-base font-normal outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CalculatorResult label="Années" tone="accent" value={age ? String(age.years) : "—"} />
        <CalculatorResult label="Mois" value={age ? String(age.months) : "—"} />
        <CalculatorResult label="Jours" value={age ? String(age.days) : "—"} />
      </div>

      {birthDateValue && !age && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          La date de naissance doit être antérieure ou égale à la date de calcul.
        </p>
      )}

      {age && (
        <p className="mt-5 rounded-2xl bg-[var(--accent-soft)] p-5 text-sm leading-6 text-[var(--foreground)]">
          Vous avez {formatAge(age.years, "an")}, {formatAge(age.months, "mois")} et {formatAge(age.days, "jour")}.
        </p>
      )}
    </CalculatorShell>
  );
}
