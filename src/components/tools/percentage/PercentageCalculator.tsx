"use client";

import { useState } from "react";
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
        error = "La valeur de départ ne peut pas être égale à 0.";
      }
    }

    if (mode === "difference") {
      result = calculateDifference(first, second);

      if (result === null) {
        error = "Les deux valeurs ne peuvent pas être égales à 0.";
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
      title: "X % de Y",
      description: "Calculer une part",
    },
    {
      id: "evolution",
      title: "Évolution",
      description: "Augmentation ou diminution",
    },
    {
      id: "difference",
      title: "Différence",
      description: "Comparer deux valeurs",
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
          {formatNumber(first)} % de {formatNumber(second)} ={" "}
          <strong>{formatNumber(result)}</strong>
        </>
      );
    }

    if (mode === "evolution") {
      if (result > 0) {
        return (
          <>
            La valeur est passée de {formatNumber(second)} à{" "}
            {formatNumber(first)}, soit une augmentation de{" "}
            <strong>{formatNumber(result)} %</strong>.
          </>
        );
      }

      if (result < 0) {
        return (
          <>
            La valeur est passée de {formatNumber(second)} à{" "}
            {formatNumber(first)}, soit une diminution de{" "}
            <strong>{formatNumber(Math.abs(result))} %</strong>.
          </>
        );
      }

      return <>La valeur n'a pas changé.</>;
    }

    return (
      <>
        L'écart entre {formatNumber(first)} et {formatNumber(second)} représente{" "}
        <strong>{formatNumber(result)} %</strong> de leur moyenne.
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

  const resultTone =
    mode === "evolution" && result !== null
      ? "border-[var(--border)] bg-[var(--surface)]"
      : "border-[var(--accent)]/20 bg-[var(--accent-soft)]";

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8">
      <div className="flex items-center justify-end">
        {(firstValue !== "" || secondValue !== "") && (
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

      <div className="mt-2">
        <div
          className="hidden gap-2 rounded-2xl bg-[var(--surface-soft)] p-2 sm:grid sm:grid-cols-3"
          role="tablist"
          aria-label="Type de calcul"
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
        <div>
          <label
            htmlFor="first-value"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            {getFirstLabel()}
          </label>

          <input
            id="first-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={firstValue}
            onChange={(event) => setFirstValue(event.target.value)}
            placeholder={getFirstPlaceholder()}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>

        <div>
          <label
            htmlFor="second-value"
            className="mb-2 block text-sm font-medium text-[var(--foreground)]"
          >
            {getSecondLabel()}
          </label>

          <input
            id="second-value"
            type="number"
            inputMode="decimal"
            step="any"
            value={secondValue}
            onChange={(event) => setSecondValue(event.target.value)}
            placeholder={getSecondPlaceholder()}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          />
        </div>
      </div>

      <div
        className={`mt-6 rounded-2xl border p-5 transition-colors ${resultTone}`}
      >
        <p className="text-sm font-medium text-[var(--muted)]">Résultat</p>

        {error ? (
          <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
            {error}
          </p>
        ) : result !== null ? (
          <>
            <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {formatNumber(result)}
              {mode !== "percentage" ? " %" : ""}
            </p>

            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {getResultExplanation()}
            </p>
          </>
        ) : (
          <p className="mt-2 text-3xl font-bold text-[var(--muted)]">—</p>
        )}
      </div>

      {result !== null && !error && (
        <details className="group mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-semibold text-[var(--foreground)]">
            <span>💡 Comment avons-nous trouvé ce résultat ?</span>

            <span className="text-lg text-[var(--muted)] transition-transform group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="border-t border-[var(--border)] px-4 pb-4 pt-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Voici le calcul réalisé à partir des valeurs que vous avez
              saisies :
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
            💡 Une différence en pourcentage peut dépasser 100 % lorsque les
            deux valeurs sont très éloignées. Ce résultat est normal : le
            calcul compare l'écart à la moyenne des deux valeurs.
          </p>
        </div>
      )}
    </section>
  );
}
