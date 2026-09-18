"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import {
  calculateDiscountAmount,
  calculateDiscountedPrice,
  isValidDiscountRate,
  isValidReductionPrice,
} from "@/lib/reduction";

function formatNumber(value: number, locale = "fr"): string {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ReductionCalculator() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [priceValue, setPriceValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  const price = Number(priceValue);
  const discountRate = Number(discountValue);
  const hasValues =
    priceValue.trim() !== "" &&
    discountValue.trim() !== "" &&
    Number.isFinite(price) &&
    Number.isFinite(discountRate);
  const valid = hasValues && isValidReductionPrice(price) && isValidDiscountRate(discountRate);
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
    <CalculatorShell>
      <CalculatorActions
        showClear={priceValue !== "" || discountValue !== ""}
        onClear={clearValues}
      />

      <div className="mt-2 grid gap-5 sm:grid-cols-2">
        <CalculatorField
          label={calculatorText("Prix initial", locale)}
          inputId="reduction-price"
          min="0.01"
          value={priceValue}
          onChange={(event) => setPriceValue(event.target.value)}
          placeholder="Ex. 150"
          unit="€"
        />
        <CalculatorField
          label={calculatorText("Réduction", locale)}
          inputId="reduction-rate"
          min="0"
          max="100"
          value={discountValue}
          onChange={(event) => setDiscountValue(event.target.value)}
          placeholder="Ex. 20"
          unit="%"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <CalculatorResult
          label={calculatorText("Prix après réduction", locale)}
          tone="accent"
          value={discountedPrice === null ? "—" : `${formatNumber(discountedPrice, locale)} €`}
        />
        <CalculatorResult
          label={calculatorText("Montant économisé", locale)}
          value={discountAmount === null ? "—" : `${formatNumber(discountAmount, locale)} €`}
        />
      </div>

      {hasValues && !valid && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          {calculatorText("Saisissez un prix positif et une réduction comprise entre 0 et 100 %.", locale)}
        </p>
      )}

      {valid && discountedPrice !== null && discountAmount !== null && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 {calculatorText("Comment avons-nous trouvé ce résultat ?", locale)}</span>
            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              {calculatorText("La réduction représente", locale)} {formatNumber(discountAmount)} € {calculatorText("sur le prix initial.", locale)}
            </p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4">
              <p className="font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(price, locale)} × {formatNumber(discountRate, locale)} ÷ 100 = {formatNumber(discountAmount)} €
              </p>
              <p className="mt-2 font-mono text-sm leading-6 text-[var(--foreground)]">
                {formatNumber(price)} − {formatNumber(discountAmount)} = {formatNumber(discountedPrice)} €
              </p>
            </div>
          </div>
        </details>
      )}
    </CalculatorShell>
  );
}
