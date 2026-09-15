"use client";

import { useTheme } from "@teispace/next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme ?? "system"}
      onChange={(event) => setTheme(event.target.value)}
      aria-label="Choisir le thème"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] outline-none transition-colors hover:bg-[var(--surface-soft)] focus:ring-2 focus:ring-[var(--accent)]"
    >
      <option value="system">🖥️ Système</option>
      <option value="light">☀️ Clair</option>
      <option value="dark">🌙 Sombre</option>
    </select>
  );
}