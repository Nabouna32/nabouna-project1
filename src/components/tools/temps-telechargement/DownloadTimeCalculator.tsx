"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
import { CalculatorResult } from "@/components/tools/calculator/CalculatorResult";
import { CalculatorShell } from "@/components/tools/calculator/CalculatorShell";
import {
  calculateDownloadTime,
  DOWNLOAD_SIZE_UNITS,
  DOWNLOAD_SPEED_UNITS,
  type DownloadSizeUnit,
  type DownloadSpeedUnit,
} from "@/lib/temps-telechargement";

const SIZE_LABELS: Record<DownloadSizeUnit, string> = {
  ko: "Ko",
  mo: "Mo",
  go: "Go",
  to: "To",
};

const SPEED_LABELS: Record<DownloadSpeedUnit, string> = {
  kbps: "Kbps",
  mbps: "Mbps",
  gbps: "Gbps",
  "ko-s": "Ko/s",
  "mo-s": "Mo/s",
  "go-s": "Go/s",
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(value);
}

export default function DownloadTimeCalculator() {
  const [size, setSize] = useState("");
  const [sizeUnit, setSizeUnit] = useState<DownloadSizeUnit>("go");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState<DownloadSpeedUnit>("mbps");

  const result = useMemo(() => {
    if (size.trim() === "" || speed.trim() === "") return null;
    const numericSize = Number(size.replace(",", "."));
    const numericSpeed = Number(speed.replace(",", "."));
    return calculateDownloadTime(numericSize, sizeUnit, numericSpeed, speedUnit);
  }, [size, sizeUnit, speed, speedUnit]);

  const hasValues = size !== "" || speed !== "";

  return (
    <CalculatorShell>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <CalculatorField
            label="Taille du fichier"
            inputId="download-time-size"
            type="number"
            min="0"
            step="any"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            placeholder="Ex. 10"
          />
          <select
            aria-label="Unité de taille du fichier"
            value={sizeUnit}
            onChange={(event) => setSizeUnit(event.target.value as DownloadSizeUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {DOWNLOAD_SIZE_UNITS.map((unit) => <option key={unit} value={unit}>{SIZE_LABELS[unit]}</option>)}
          </select>
        </div>

        <div>
          <CalculatorField
            label="Vitesse de téléchargement"
            inputId="download-time-speed"
            type="number"
            min="0"
            step="any"
            value={speed}
            onChange={(event) => setSpeed(event.target.value)}
            placeholder="Ex. 100"
          />
          <select
            aria-label="Unité de vitesse de téléchargement"
            value={speedUnit}
            onChange={(event) => setSpeedUnit(event.target.value as DownloadSpeedUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {DOWNLOAD_SPEED_UNITS.map((unit) => <option key={unit} value={unit}>{SPEED_LABELS[unit]}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <CalculatorResult label="Jours" value={result === null ? "—" : String(result.days)} />
        <CalculatorResult label="Heures" value={result === null ? "—" : String(result.hours)} />
        <CalculatorResult label="Minutes" tone="accent" value={result === null ? "—" : String(result.minutes)} />
        <CalculatorResult label="Secondes" value={result === null ? "—" : String(result.seconds)} />
      </div>

      {result && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">
            Temps estimé : {formatNumber(result.totalSeconds)} secondes, soit environ {result.days > 0 ? `${result.days} j ` : ""}{String(result.hours).padStart(2, "0")} h {String(result.minutes).padStart(2, "0")} min {String(result.seconds).padStart(2, "0")} s.
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Estimation théorique à débit constant. Les unités de taille et de débit sont décimales.
          </p>
        </div>
      )}

      <CalculatorActions showClear={hasValues} onClear={() => { setSize(""); setSpeed(""); }} />
    </CalculatorShell>
  );
}
