"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import { calculateAge } from "@/lib/age";

function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatAgePart(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

export default function AgeCalculator() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const today = toInputDate(new Date());
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState(today);

  const birth = birthDate ? new Date(`${birthDate}T12:00:00`) : null;
  const reference = referenceDate ? new Date(`${referenceDate}T12:00:00`) : null;
  const age = birth && reference ? calculateAge(birth, reference) : null;
  const hasBirthDate = birthDate !== "";
  const invalidRange = hasBirthDate && referenceDate !== "" && age === null;

  function clearValues() {
    setBirthDate("");
    setReferenceDate(toInputDate(new Date()));
  }

  return (
    <CalculatorShell>
      <CalculatorActions
        showClear={hasBirthDate || referenceDate !== today}
        onClear={clearValues}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <CalculatorField
          label=calculatorText("Date de naissance", locale)
          inputId="age-birth-date"
          type="date"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
        />
        <CalculatorField
          label=calculatorText("Calculer au", locale)
          inputId="age-reference-date"
          type="date"
          value={referenceDate}
          onChange={(event) => setReferenceDate(event.target.value)}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CalculatorResult
          label=calculatorText("Années", locale)
          tone="accent"
          value={age === null ? "—" : String(age.years)}
        />
        <CalculatorResult label=calculatorText("Mois", locale) value={age === null ? "—" : String(age.months)} />
        <CalculatorResult label=calculatorText("Jours", locale) value={age === null ? "—" : String(age.days)} />
      </div>

      {invalidRange && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          La date de naissance doit être antérieure ou égale à la date de référence.
        </p>
      )}

      {age && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">
            Vous avez {formatAgePart(age.years, "an", "ans")}, {formatAgePart(age.months, "mois", "mois")} et {formatAgePart(age.days, "jour", "jours")}.
          </p>
        </div>
      )}
    </CalculatorShell>
  );
}
