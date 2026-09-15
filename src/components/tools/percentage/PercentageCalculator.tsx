"use client";

import { useState } from "react";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PercentageCalculator() {
  const [percentage, setPercentage] = useState("");
  const [value, setValue] = useState("");

  const percentageNumber = Number(percentage);
  const valueNumber = Number(value);

  const result =
    percentage !== "" &&
    value !== "" &&
    Number.isFinite(percentageNumber) &&
    Number.isFinite(valueNumber)
      ? (percentageNumber / 100) * valueNumber
      : null;

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Calculer un pourcentage
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Entrez un pourcentage et une valeur pour obtenir le résultat.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="percentage"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Pourcentage
          </label>

          <div className="relative">
            <input
              id="percentage"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={percentage}
              onChange={(event) => setPercentage(event.target.value)}
              placeholder="Ex. 20"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-10 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]">
              %
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="value"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Valeur
          </label>

          <input
            id="value"
            type="number"
            inputMode="decimal"
            step="any"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Ex. 150"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-[var(--accent-soft)] p-5">
        <p className="text-sm font-medium text-[var(--muted)]">
          Résultat
        </p>

        <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
          {result !== null ? formatNumber(result) : "—"}
        </p>

        {result !== null && (
          <p className="mt-2 text-sm text-[var(--muted)]">
            {formatNumber(percentageNumber)} % de{" "}
            {formatNumber(valueNumber)} = {formatNumber(result)}
          </p>
        )}
      </div>
    </section>
  );
}