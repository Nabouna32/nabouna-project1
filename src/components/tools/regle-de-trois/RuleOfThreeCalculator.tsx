"use client";

import { useState } from "react";
import {
  calculateRuleOfThree,
  isValidRuleOfThreeInput,
} from "@/lib/regle-de-trois";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 4,
  }).format(value);
}

export default function RuleOfThreeCalculator() {
  const [firstValue, setFirstValue] = useState("");
  const [firstResult, setFirstResult] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const first = Number(firstValue);
  const result = Number(firstResult);
  const second = Number(secondValue);
  const hasValues =
    firstValue.trim() !== "" &&
    firstResult.trim() !== "" &&
    secondValue.trim() !== "" &&
    Number.isFinite(first) &&
    Number.isFinite(result) &&
    Number.isFinite(second);
  const valid = hasValues && isValidRuleOfThreeInput(first, result, second);
  const calculatedValue = valid ? calculateRuleOfThree(first, result, second) : null;

  function clearValues() {
    setFirstValue("");
    setFirstResult("");
    setSecondValue("");
  }

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-end">
        {(firstValue !== "" || firstResult !== "" || secondValue !== "") && (
          <button
            type="button"
            onClick={clearValues}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-sm font-medium text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
          >
            <span aria-hidden="true">↺</span>
            Effacer
          </button>
        )}
      </div>

      <div className="mt-2 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="rule-first-value"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Première valeur
          </label>
          <input
            id="rule-first-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            placeholder="Ex. 4"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <div>
          <label
            htmlFor="rule-first-result"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Valeur correspondante
          </label>
          <input
            id="rule-first-result"
            type="number"
            inputMode="decimal"
            step="any"
            value={firstResult}
            onChange={(event) => setFirstResult(event.target.value)}
            placeholder="Ex. 10"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <div>
          <label
            htmlFor="rule-second-value"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Deuxième valeur
          </label>
          <input
            id="rule-second-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            placeholder="Ex. 6"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">Résultat</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {calculatedValue === null ? "—" : formatNumber(calculatedValue)}
          </p>
        </div>
      </div>

      {hasValues && !valid && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          Saisissez trois nombres valides. La première valeur doit être différente de zéro.
        </p>
      )}

      {valid && calculatedValue !== null && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 Comment avons-nous trouvé ce résultat ?</span>
            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              On conserve le même rapport entre les deux premières valeurs pour calculer la quatrième.
            </p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4">
              <p className="font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(first)} × {formatNumber(calculatedValue)} = {formatNumber(second)} × {formatNumber(result)}
              </p>
              <p className="mt-2 font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(result)} × {formatNumber(second)} ÷ {formatNumber(first)} = {formatNumber(calculatedValue)}
              </p>
            </div>
          </div>
        </details>
      )}
    </section>
  );
}
