"use client";

import { useState } from "react";
import {
  calculateHt,
  calculateTtc,
  calculateVatAmount,
  isValidVatRate,
} from "@/lib/tva";

type Mode = "ht-to-ttc" | "ttc-to-ht";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function TVACalculator() {
  const [mode, setMode] = useState<Mode>("ht-to-ttc");
  const [priceValue, setPriceValue] = useState("");
  const [rateValue, setRateValue] = useState("20");

  const price = Number(priceValue);
  const rate = Number(rateValue);
  const hasValues =
    priceValue.trim() !== "" &&
    rateValue.trim() !== "" &&
    Number.isFinite(price) &&
    Number.isFinite(rate);
  const valid =
    hasValues && price >= 0 && isValidVatRate(rate) && !(mode === "ttc-to-ht" && rate === -100);

  const ht = valid ? (mode === "ht-to-ttc" ? price : calculateHt(price, rate)) : null;
  const ttc = valid ? (mode === "ht-to-ttc" ? calculateTtc(price, rate) : price) : null;
  const vat = valid && ht !== null ? calculateVatAmount(ht, rate) : null;

  function clearValues() {
    setPriceValue("");
    setRateValue("20");
  }

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--background)] p-1">
          <button
            type="button"
            onClick={() => setMode("ht-to-ttc")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === "ht-to-ttc"
                ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            HT → TTC
          </button>
          <button
            type="button"
            onClick={() => setMode("ttc-to-ht")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              mode === "ttc-to-ht"
                ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            TTC → HT
          </button>
        </div>

        {(priceValue !== "" || rateValue !== "20") && (
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

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tva-price" className="mb-2 block text-sm font-medium text-[var(--foreground)]">
            {mode === "ht-to-ttc" ? "Prix HT" : "Prix TTC"}
          </label>
          <div className="relative">
            <input
              id="tva-price"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={priceValue}
              onChange={(event) => setPriceValue(event.target.value)}
              placeholder={mode === "ht-to-ttc" ? "Ex. 100" : "Ex. 120"}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">€</span>
          </div>
        </div>

        <div>
          <label htmlFor="tva-rate" className="mb-2 block text-sm font-medium text-[var(--foreground)]">Taux de TVA</label>
          <div className="relative">
            <input
              id="tva-rate"
              type="number"
              inputMode="decimal"
              min="0"
              max="100"
              step="any"
              value={rateValue}
              onChange={(event) => setRateValue(event.target.value)}
              placeholder="Ex. 20"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
            />
            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">%</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-soft)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">Prix HT</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {ht === null ? "—" : `${formatNumber(ht)} €`}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">TVA</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {vat === null ? "—" : `${formatNumber(vat)} €`}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
          <p className="text-sm font-medium text-[var(--muted)]">Prix TTC</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {ttc === null ? "—" : `${formatNumber(ttc)} €`}
          </p>
        </div>
      </div>

      {hasValues && !valid && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          Saisissez un prix positif et un taux de TVA compris entre 0 et 100 %.
        </p>
      )}

      {valid && ht !== null && ttc !== null && vat !== null && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 Comment avons-nous trouvé ce résultat ?</span>
            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Avec un taux de {formatNumber(rate)} %, la TVA représente {formatNumber(vat)} €.
            </p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4">
              <p className="font-mono text-sm leading-6 text-[var(--foreground)]">
                {mode === "ht-to-ttc"
                  ? `${formatNumber(ht)} × (1 + ${formatNumber(rate)} ÷ 100) = ${formatNumber(ttc)} €`
                  : `${formatNumber(ttc)} ÷ (1 + ${formatNumber(rate)} ÷ 100) = ${formatNumber(ht)} €`}
              </p>
            </div>
          </div>
        </details>
      )}
    </section>
  );
}
