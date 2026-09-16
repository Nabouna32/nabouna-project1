"use client";

import { useState } from "react";
import {
  calculateDiscountAmount,
  calculateDiscountedPrice,
  isValidDiscountRate,
} from "@/lib/reduction";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ReductionCalculator() {
  const [priceValue, setPriceValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const price = Number(priceValue);
  const discountRate = Number(discountValue);
  const hasValues =
    priceValue.trim() !== "" &&
    discountValue.trim() !== "" &&
    Number.isFinite(price) &&
    Number.isFinite(discountRate);
  const valid = hasValues && price >= 0 && isValidDiscountRate(discountRate);
  const discountAmount = valid
    ? calculateDiscountAmount(price, discountRate)
    : null;
  const discountedPrice = valid
    ? calculateDiscountedPrice(price, discountRate)
    : null;

  function clearValues() {
    setPriceValue("");
    setDiscountValue("");
  }

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-end">
        {(priceValue !== "" || discountValue !== "") && (
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
            htmlFor="reduction-price"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Prix initial
          </label>
          <div className="relative">
            <input
              id="reduction-price"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={priceValue}
              onChange={(event) => setPriceValue(event.target.value)}
              placeholder="Ex. 150"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">
              €
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="reduction-rate"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Réduction
          </label>
          <div className="relative">
            <input
              id="reduction-rate"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="any"
              value={discountValue}
              onChange={(event) => setDiscountValue(event.target.value)}
              placeholder="Ex. 20"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">
              %
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">Prix après réduction</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {discountedPrice === null ? "—" : `${formatNumber(discountedPrice)} €`}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">Montant économisé</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            {discountAmount === null ? "—" : `${formatNumber(discountAmount)} €`}
          </p>
        </div>
      </div>

      {hasValues && !valid && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          Saisissez un prix positif et une réduction comprise entre 0 et 100 %.
        </p>
      )}

      {valid && discountedPrice !== null && discountAmount !== null && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 Comment avons-nous trouvé ce résultat ?</span>
            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              La réduction représente {formatNumber(discountAmount)} € sur le prix initial.
            </p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4">
              <p className="font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(price)} × {formatNumber(discountRate)} ÷ 100 = {formatNumber(discountAmount)} €
              </p>
              <p className="mt-2 font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(price)} − {formatNumber(discountAmount)} = {formatNumber(discountedPrice)} €
              </p>
            </div>
          </div>
        </details>
      )}
    </section>
  );
}
