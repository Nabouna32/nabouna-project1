"use client";

import { useState } from "react";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import { calculateDifference, calculateEvolution, calculatePercentage } from "@/lib/percentage";
import { useLocale } from "@/lib/i18n/use-locale";
import { getToolMessages } from "@/lib/i18n/tool-messages";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";

type Mode = "percentage" | "evolution" | "difference";

function formatNumber(value: number, locale: "fr" | "en"): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", { maximumFractionDigits: 2 }).format(value);
}

export default function PercentageCalculator() {
  const locale = useLocale();
  const t = getToolMessages(locale).percentage;
  const [mode, setMode] = useState<Mode>("percentage");
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const first = Number(firstValue);
  const second = Number(secondValue);
  const hasValues = firstValue.trim() !== "" && secondValue.trim() !== "" && Number.isFinite(first) && Number.isFinite(second);

  let result: number | null = null;
  let error: string | null = null;
  if (hasValues) {
    if (mode === "percentage") result = calculatePercentage(first, second);
    if (mode === "evolution") {
      result = calculateEvolution(first, second);
      if (result === null) error = t.evolutionZero;
    }
    if (mode === "difference") {
      result = calculateDifference(first, second);
      if (result === null) error = t.differenceZero;
    }
  }

  const modes = [
    { id: "percentage" as const, ...t.modes.percentage },
    { id: "evolution" as const, ...t.modes.evolution },
    { id: "difference" as const, ...t.modes.difference },
  ];

  const firstLabel = t.firstLabels[mode];
  const secondLabel = t.secondLabels[mode];
  const firstPlaceholder = t.firstPlaceholders[mode];
  const secondPlaceholder = t.secondPlaceholders[mode];

  function getResultExplanation() {
    if (result === null || error) return null;
    const firstText = formatNumber(first, locale);
    const secondText = formatNumber(second, locale);
    const resultText = formatNumber(Math.abs(result), locale);
    if (mode === "percentage") return <>{t.percentageExplanation(firstText, secondText, resultText)}</>;
    if (mode === "evolution") {
      if (result > 0) return <>{t.increaseExplanation(secondText, firstText, resultText)}</>;
      if (result < 0) return <>{t.decreaseExplanation(secondText, firstText, resultText)}</>;
      return <>{t.unchangedExplanation}</>;
    }
    return <>{t.differenceExplanation(firstText, secondText, resultText)}</>;
  }

  function getFormula() {
    if (!hasValues || error || result === null) return null;
    if (mode === "percentage") return <>{formatNumber(second, locale)} × {formatNumber(first, locale)} ÷ 100 = <strong>{formatNumber(result, locale)}</strong></>;
    if (mode === "evolution") return <>({formatNumber(first, locale)} − {formatNumber(second, locale)}) ÷ {formatNumber(second, locale)} × 100 = <strong>{formatNumber(result, locale)} %</strong></>;
    const difference = Math.abs(first - second);
    const average = (Math.abs(first) + Math.abs(second)) / 2;
    return <>{formatNumber(difference, locale)} ÷ {formatNumber(average, locale)} × 100 = <strong>{formatNumber(result, locale)} %</strong></>;
  }

  function clearValues() { setFirstValue(""); setSecondValue(""); }

  return (
    <CalculatorShell>
      <CalculatorActions showClear={firstValue !== "" || secondValue !== ""} onClear={clearValues} />
      <div className="mt-2">
        <div className="hidden sm:block">
          <SegmentedControl
            items={modes.map((item) => ({ id: item.id, label: item.title, description: item.description }))}
            value={mode}
            onChange={setMode}
            ariaLabel={t.type}
            className="grid-cols-3"
          />
        </div>
        <div className="sm:hidden">
          <Select id="percentage-mode" label={t.type} value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
            {modes.map((item) => <option key={item.id} value={item.id}>{item.title} — {item.description}</option>)}
          </Select>
        </div>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <CalculatorField label={firstLabel} inputId="first-value" value={firstValue} onChange={(event) => setFirstValue(event.target.value)} placeholder={firstPlaceholder} />
        <CalculatorField label={secondLabel} inputId="second-value" value={secondValue} onChange={(event) => setSecondValue(event.target.value)} placeholder={secondPlaceholder} />
      </div>
      <div className="mt-6">
        <CalculatorResult label={t.result} tone={mode === "evolution" && result !== null ? "neutral" : "accent"} value={error ? error : result === null ? "—" : `${formatNumber(result, locale)}${mode !== "percentage" ? " %" : ""}`} />
        {result !== null && !error && <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{getResultExplanation()}</p>}
      </div>
      {result !== null && !error && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]"><span>{t.how}</span><span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">+</span></summary>
          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">{t.formulaIntroWithValues}</p>
            <div className="mt-3 rounded-xl bg-[var(--surface-soft)] p-4"><p className="font-mono text-sm leading-6 text-[var(--foreground)]">{getFormula()}</p></div>
          </div>
        </details>
      )}
      {mode === "difference" && result !== null && !error && <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"><p className="text-sm leading-6 text-[var(--muted)]">{t.differenceNote}</p></div>}
    </CalculatorShell>
  );
}
