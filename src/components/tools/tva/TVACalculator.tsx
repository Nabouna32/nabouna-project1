"use client";

import { useState } from "react";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
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
  const valid = hasValues && price >= 0 && isValidVatRate(rate);

  const ht = valid ? (mode === "ht-to-ttc" ? price : calculateHt(price, rate)) : null;
  const ttc = valid ? (mode === "ht-to-ttc" ? calculateTtc(price, rate) : price) : null;
  const vat = valid && ht !== null ? calculateVatAmount(ht, rate) : null;

  function clearValues() {
    setPriceValue("");
    setRateValue("20");
  }

  return (
    <CalculatorShell>
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex rounded-xl border border-[var(--border)] bg-[var(--background)] p-1">
          <button
            type="button"
            aria-pressed={mode === "ht-to-ttc"}
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
            aria-pressed={mode === "ttc-to-ht"}
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

        <CalculatorActions
          showClear={priceValue !== "" || rateValue !== "20"}
          onClear={clearValues}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <CalculatorField
          label={mode === "ht-to-ttc" ? "Prix HT" : "Prix TTC"}
          inputId="tva-price"
          min="0"
          value={priceValue}
          onChange={(event) => setPriceValue(event.target.value)}
          placeholder={mode === "ht-to-ttc" ? "Ex. 100" : "Ex. 120"}
          unit="€"
        />
        <CalculatorField
          label="Taux de TVA"
          inputId="tva-rate"
          min="0"
          max="100"
          value={rateValue}
          onChange={(event) => setRateValue(event.target.value)}
          placeholder="Ex. 20"
          unit="%"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CalculatorResult label="Prix HT" tone="accent" value={ht === null ? "—" : `${formatNumber(ht)} €`} />
        <CalculatorResult label="TVA" value={vat === null ? "—" : `${formatNumber(vat)} €`} />
        <CalculatorResult label="Prix TTC" value={ttc === null ? "—" : `${formatNumber(ttc)} €`} />
      </div>

      {hasValues && !valid && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          Saisissez un prix supérieur ou égal à 0 et un taux de TVA compris entre 0 et 100 %.
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
    </CalculatorShell>
  );
}
