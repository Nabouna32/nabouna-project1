"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import {
  calculateDifference,
  calculateEvolution,
  calculatePercentage,
} from "@/lib/percentage";

type Mode = "percentage" | "evolution" | "difference";

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(value);
}

export default function PercentageCalculator() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [mode, setMode] = useState<Mode>("percentage");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const first = Number(firstValue);
  const second = Number(secondValue);

  const hasValues =
    firstValue.trim() !== "" &&
    secondValue.trim() !== "" &&
    Number.isFinite(first) &&
    Number.isFinite(second);

  let result: number | null = null;
  let error: string | null = null;

  if (hasValues) {
    if (mode === "percentage") {
      result = calculatePercentage(first, second);
    }

    if (mode === "evolution") {
      result = calculateEvolution(first, second);

      if (result === null) {
        error = calculatorText("La valeur de départ ne peut pas être égale à 0.", locale);
      }
    }

    if (mode === "difference") {
      result = calculateDifference(first, second);

      if (result === null) {
        error = calculatorText("Les deux valeurs ne peuvent pas être égales à 0.", locale);
      }
    }
  }

  const modes: {
    id: Mode;
    title: string;
    description: string;
  }[] = [
    {
      id: "percentage",
      title: calculatorText("X % de Y", locale),
      description: calculatorText("Calculer une part", locale),
    },
    {
      id: "evolution",
      title: calculatorText("Évolution", locale),
      description: calculatorText("Augmentation ou diminution", locale),
    },
    {
      id: "difference",
      title: calculatorText("Différence", locale),
      description: calculatorText("Comparer deux valeurs", locale),
    },
  ];

  function getFirstLabel() {
    if (mode === "percentage") return "Pourcentage";
    if (mode === "evolution") return "Valeur finale";
    return "Première valeur";
  }

  function getSecondLabel() {
    if (mode === "percentage") return "Valeur";
    if (mode === "evolution") return "Valeur de départ";
    return "Deuxième valeur";
  }

  function getFirstPlaceholder() {
    if (mode === "percentage") return "Ex. 20";
    if (mode === "evolution") return "Ex. 120";
    return "Ex. 100";
  }

  function getSecondPlaceholder() {
    if (mode === "percentage") return "Ex. 150";
    if (mode === "evolution") return "Ex. 100";
    return "Ex. 120";
  }

  function getResultExplanation() {
    if (result === null || error) return null;

    if (mode === "percentage") {
      return (
        <>
          {formatNumber(first)} % {calculatorText("de", locale)} {formatNumber(second)} ={" "}
          <strong>{formatNumber(result)}</strong>
        </>
      );
    }

    if (mode === "evolution") {
      if (result > 0) {
        return (
          <>
            {calculatorText("La valeur est passée de", locale)} {formatNumber(second)}{" "}
            {calculatorText("à", locale)} {formatNumber(first)}, {calculatorText("soit une augmentation de", locale)}{" "}
            <strong>{formatNumber(result)} %</strong>.
          </>
        );
      }

      if (result < 0) {
        return (
          <>
            {calculatorText("La valeur est passée de", locale)} {formatNumber(second)}{" "}
            {calculatorText("à", locale)} {formatNumber(first)}, {calculatorText("soit une diminution de", locale)}{" "}
            <strong>{formatNumber(Math.abs(result))} %</strong>.
          </>
        );
      }

      return <>{calculatorText("La valeur n\\'a pas changé.", locale)}</>;
    }

    return (
      <>
        {calculatorText("L\\'écart entre", locale)} {formatNumber(first)} {calculatorText("et", locale)} {formatNumber(second)}{" "}
        {calculatorText("représente", locale)} <strong>{formatNumber(result)} %</strong>{" "}
        {calculatorText("de leur moyenne.", locale)}
      </>
    );
  }

  function getFormula() {
    if (!hasValues || error || result === null) return null;

    if (mode === "percentage") {
      return (
        <>
          {formatNumber(second)} × {formatNumber(first)} ÷ 100 ={" "}
          <strong>{formatNumber(result)}</strong>
        </>
      );
    }

    if (mode === "evolution") {
      return (
        <>
          ({formatNumber(first)} − {formatNumber(second)}) ÷{" "}
          {formatNumber(second)} × 100 ={" "}
          <strong>{formatNumber(result)} %</strong>
        </>
      );
    }

    const difference = Math.abs(first - second);
    const average = (Math.abs(first) + Math.abs(second)) / 2;

    return (
      <>
        {formatNumber(difference)} ÷ {formatNumber(average)} × 100 ={" "}
        <strong>{formatNumber(result)} %</strong>
      </>
    );
  }

  function clearValues() {
    setFirstValue("");
    setSecondValue("");
  }

  return (
    <CalculatorShell>
      <CalculatorActions
        showClear={firstValue !== "" || secondValue !== ""}
        onClear={clearValues}
      />

      <div className="mt-2">
        <div
          className="hidden gap-2 rounded-2xl bg-[var(--surface-soft)] p-2 sm:grid sm:grid-cols-3"
          role="tablist"
          aria-label={calculatorText("Type de calcul", locale)}
        >
          {modes.map((item) => {
            const active = mode === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMode(item.id)}
                className={`rounded-xl px-4 py-3 text-left transition ${
                  active
                    ? "bg-[var(--surface)] shadow-sm"
                    : "hover:bg-[var(--surface)]/60"
                }`}
              >
                <p
                  className={`font-semibold ${
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="sm:hidden">
          <label
            htmlFor="percentage-mode"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            Type de calcul
          </label>
          <select
            id="percentage-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-medium text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {modes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} — {item.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <CalculatorField
          label={getFirstLabel()}
          inputId="first-value"
          value={firstValue}
          onChange={(event) => setFirstValue(event.target.value)}
          placeholder={getFirstPlaceholder()}
        />
        <CalculatorField
          label={getSecondLabel()}
          inputId="second-value"
          value={secondValue}
          onChange={(event) => setSecondValue(event.target.value)}
          placeholder={getSecondPlaceholder()}
        />
      </div>

      <div className="mt-6">
        <CalculatorResult
          label={calculatorText("Résultat", locale)}
          tone={mode === "evolution" && result !== null ? "neutral" : "accent"}
          value={
            error
              ? error
              : result === null
                ? "—"
                : `${formatNumber(result)}${mode !== "percentage" ? " %" : ""}`
          }
        />
        {result !== null && !error && (
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {getResultExplanation()}
          </p>
        )}
      </div>

      {result !== null && !error && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 {calculatorText("Comment avons-nous trouvé ce résultat ?", locale)}</span>
            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              {calculatorText("Voici le calcul réalisé à partir des valeurs que vous avez saisies :", locale)}
            </p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4">
              <p className="font-mono text-sm leading-6 text-[var(--foreground)]">
                {getFormula()}
              </p>
            </div>
          </div>
        </details>
      )}

      {mode === "difference" && result !== null && !error && (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">
            💡 {calculatorText("Une différence en pourcentage peut dépasser 100 % lorsque les deux valeurs sont très éloignées. Ce résultat est normal : le calcul compare l'écart à la moyenne des deux valeurs.", locale)}
          </p>
        </div>
      )}
    </CalculatorShell>
  );
}
