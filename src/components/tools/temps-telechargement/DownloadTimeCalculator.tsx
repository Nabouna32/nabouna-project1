"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { calculatorText } from "@/lib/i18n/calculators";
import { CalculatorActions } from "@/components/tools/calculator/CalculatorActions";
import { CalculatorField } from "@/components/tools/calculator/CalculatorField";
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

function formatDuration(days: number, hours: number, minutes: number, seconds: number): string {
  const parts: string[] = [];
  if (days > 0) parts.push(`${days} j`);
  if (hours > 0 || days > 0) parts.push(`${hours} h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes} min`);
  parts.push(`${seconds} s`);
  return parts.join(" ");
}

export default function DownloadTimeCalculator() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
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
      <CalculatorActions showClear={hasValues} onClear={() => { setSize(""); setSpeed(""); }} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <CalculatorField
            label={calculatorText("Taille du fichier", locale)}
            inputId="download-time-size"
            type="number"
            min="0"
            step="any"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            placeholder="Ex. 10"
          />
          <select
            aria-label={calculatorText("Unité de taille du fichier", locale)}
            value={sizeUnit}
            onChange={(event) => setSizeUnit(event.target.value as DownloadSizeUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {DOWNLOAD_SIZE_UNITS.map((unit) => <option key={unit} value={unit}>{SIZE_LABELS[unit]}</option>)}
          </select>
        </div>

        <div>
          <CalculatorField
            label={calculatorText("Vitesse de téléchargement", locale)}
            inputId="download-time-speed"
            type="number"
            min="0"
            step="any"
            value={speed}
            onChange={(event) => setSpeed(event.target.value)}
            placeholder="Ex. 100"
          />
          <select
            aria-label={calculatorText("Unité de vitesse de téléchargement", locale)}
            value={speedUnit}
            onChange={(event) => setSpeedUnit(event.target.value as DownloadSpeedUnit)}
            className="mt-2 block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          >
            {DOWNLOAD_SPEED_UNITS.map((unit) => <option key={unit} value={unit}>{SPEED_LABELS[unit]}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-sm leading-6 text-[var(--muted)]">Temps estimé</p>
          <p className="mt-1 text-xl font-semibold text-[var(--foreground)]">
            {formatDuration(result.days, result.hours, result.minutes, result.seconds)}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Soit environ {formatNumber(result.totalSeconds)} secondes.
          </p>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
            Estimation théorique à débit constant. Les unités de taille et de débit sont décimales.
          </p>
        </div>
      )}
    </CalculatorShell>
  );
}
