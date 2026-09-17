"use client";

import { useState } from "react";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import { calculateDateDuration, calculateTimeDuration } from "@/lib/duree";

type Mode = "dates" | "horaires";

function toInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDurationPart(value: number, singular: string, plural: string): string {
  return `${value} ${value === 1 ? singular : plural}`;
}

export default function DurationCalculator() {
  const today = toInputDate(new Date());
  const [mode, setMode] = useState<Mode>("dates");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dateDuration =
    mode === "dates" && startDate && endDate
      ? calculateDateDuration(
          new Date(`${startDate}T12:00:00`),
          new Date(`${endDate}T12:00:00`),
        )
      : null;
  const timeDuration = mode === "horaires" ? calculateTimeDuration(startTime, endTime) : null;
  const duration = mode === "dates" ? dateDuration : timeDuration;
  const hasValues = mode === "dates" ? startDate !== "" || endDate !== today : startTime !== "" || endTime !== "";
  const invalidRange =
    mode === "dates" && startDate !== "" && endDate !== "" && dateDuration === null;

  function clearValues() {
    setStartDate("");
    setEndDate(toInputDate(new Date()));
    setStartTime("");
    setEndTime("");
  }

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setStartDate("");
    setEndDate(toInputDate(new Date()));
    setStartTime("");
    setEndTime("");
  }

  return (
    <CalculatorShell>
      <CalculatorActions showClear={hasValues} onClear={clearValues} />

      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-1">
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
          📅 Entre deux dates
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
          🕐 Entre deux horaires
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {mode === "dates" ? (
          <>
            <CalculatorField
              label="Date de début"
              inputId="duration-start-date"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <CalculatorField
              label="Date de fin"
              inputId="duration-end-date"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </>
        ) : (
          <>
            <CalculatorField
              label="Heure de début"
              inputId="duration-start-time"
              type="time"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
            />
            <CalculatorField
              label="Heure de fin"
              inputId="duration-end-time"
              type="time"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
          </>
        )}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CalculatorResult
          label="Jours"
          tone="accent"
          value={duration === null ? "—" : String(duration.days)}
        />
        <CalculatorResult
          label="Heures"
          value={duration === null ? "—" : String(duration.hours)}
        />
        <CalculatorResult
          label="Minutes"
          value={duration === null ? "—" : String(duration.minutes)}
        />
      </div>

      {invalidRange && (
        <p className="mt-4 text-sm font-medium text-[var(--foreground)]">
          La date de début doit être antérieure ou égale à la date de fin.
        </p>
      )}

      {duration && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">
            La durée est de {formatDurationPart(duration.days, "jour", "jours")}, {formatDurationPart(duration.hours, "heure", "heures")} et {formatDurationPart(duration.minutes, "minute", "minutes")}.
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
