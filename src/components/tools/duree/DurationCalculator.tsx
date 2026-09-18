"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import { calculateDateDuration, calculateTimeDuration } from "@/lib/duree";

type Mode = "dates" | "horaires";

function toInputDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDurationPart(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

export default function DurationCalculator() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [initialEndDateTime] = useState(() => toInputDateTime(new Date()));
  const [mode, setMode] = useState<Mode>("dates");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState(initialEndDateTime);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dateDuration =
    mode === "dates" && startDateTime && endDateTime
      ? calculateDateDuration(new Date(startDateTime), new Date(endDateTime))
      : null;
  const timeDuration = mode === "horaires" ? calculateTimeDuration(startTime, endTime) : null;
  const duration = mode === "dates" ? dateDuration : timeDuration;
  const hasValues =
    mode === "dates"
      ? startDateTime !== "" || endDateTime !== initialEndDateTime
      : startTime !== "" || endTime !== "";
  const invalidRange =
    mode === "dates" && startDateTime !== "" && endDateTime !== "" && dateDuration === null;

  function clearValues() {
    setStartDateTime("");
    setEndDateTime(initialEndDateTime);
    setStartTime("");
    setEndTime("");
  }

  function switchMode(nextMode: Mode) {
    if (nextMode === mode) return;

    setMode(nextMode);
    clearValues();
  }

  return (
    <CalculatorShell>
      <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-1">
        <button
          type="button"
          aria-pressed={mode === "dates"}
          onClick={() => switchMode("dates")}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            mode === "dates"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          📅 {locale === "en" ? "Between two dates" : "Entre deux dates"}
        </button>
        <button
          type="button"
          aria-pressed={mode === "horaires"}
          onClick={() => switchMode("horaires")}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
            mode === "horaires"
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          🕐 {locale === "en" ? "Between two times" : "Entre deux horaires"}
        </button>
      </div>

      <CalculatorActions showClear={hasValues} onClear={clearValues} />

      <div className="grid gap-5 sm:grid-cols-2">
        {mode === "dates" ? (
          <>
            <CalculatorField
              label=calculatorText("Date et heure de début", locale)
              inputId="duration-start-date"
              type="datetime-local"
              value={startDateTime}
              onChange={(event) => setStartDateTime(event.target.value)}
            />
            <CalculatorField
              label=calculatorText("Date et heure de fin", locale)
              inputId="duration-end-date"
              type="datetime-local"
              value={endDateTime}
              onChange={(event) => setEndDateTime(event.target.value)}
            />
          </>
        ) : (
          <>
            <CalculatorField
              label=calculatorText("Heure de début", locale)
              inputId="duration-start-time"
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
            />
            <CalculatorField
              label=calculatorText("Heure de fin", locale)
              inputId="duration-end-time"
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </>
        )}
      </div>

      <div className={`mt-6 grid gap-4 ${mode === "dates" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {mode === "dates" && (
          <CalculatorResult
            label=calculatorText("Jours", locale)
            tone="accent"
            value={duration === null ? "—" : String(duration.days)}
          />
        )}
        <CalculatorResult
          label=calculatorText("Heures", locale)
          tone={mode === "horaires" ? "accent" : undefined}
          value={duration === null ? "—" : String(duration.hours)}
        />
        <CalculatorResult
          label=calculatorText("Minutes", locale)
          value={duration === null ? "—" : String(duration.minutes)}
        />
      </div>

      {invalidRange && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          La date et l'heure de début doivent être antérieures ou égales à la date et l'heure de fin.
        </p>
      )}

      {duration && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">
            {mode === "dates"
              ? `La durée est de ${formatDurationPart(duration.days, "jour", "jours")}, ${formatDurationPart(duration.hours, "heure", "heures")} et ${formatDurationPart(duration.minutes, "minute", "minutes")}.`
              : `La durée est de ${formatDurationPart(duration.hours, "heure", "heures")} et ${formatDurationPart(duration.minutes, "minute", "minutes")}.`}
          </p>
          {mode === "horaires" && endTime < startTime && (
            <p className="mt-2 text-xs text-[var(--muted)]">
              Le calcul considère que l'heure de fin est le lendemain.
            </p>
          )}
        </div>
      )}
    </CalculatorShell>
  );
}
