import type { ReactNode } from "react";

type ResultPanelProps = {
  label: string;
  value: ReactNode;
  tone?: "accent" | "neutral";
};

export function ResultPanel({ label, value, tone = "neutral" }: ResultPanelProps) {
  const toneClass = tone === "accent"
    ? "border-[var(--accent)]/20 bg-[var(--accent-soft)]"
    : "border-[var(--border)] bg-[var(--background)]";

  return (
    <div className={["rounded-[var(--radius-xl)] border p-5", toneClass].join(" ")}>
      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">{value}</p>
    </div>
  );
}
