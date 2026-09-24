"use client";

import { useTheme } from "@teispace/next-themes";
import { useLocale } from "@/lib/i18n/use-locale";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const labels = locale === "fr"
    ? { aria: "Choisir le thème", system: "🖥️ Système", light: "☀️ Clair", dark: "🌙 Sombre" }
    : { aria: "Choose theme", system: "🖥️ System", light: "☀️ Light", dark: "🌙 Dark" };

  return (
    <select
      suppressHydrationWarning
      value={theme ?? "system"}
      onChange={(event) => setTheme(event.target.value)}
      aria-label={labels.aria}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] outline-none transition-colors hover:bg-[var(--surface-soft)] focus:ring-2 focus:ring-[var(--accent)]"
    >
      <option value="system">{labels.system}</option>
      <option value="light">{labels.light}</option>
      <option value="dark">{labels.dark}</option>
    </select>
  );
}
