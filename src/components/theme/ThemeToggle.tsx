"use client";

import { useTheme } from "@teispace/next-themes";
import { useLocale } from "@/lib/i18n/use-locale";
import { Select } from "@/components/ui/Select";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const labels = locale === "fr"
    ? { aria: "Choisir le thème", system: "🖥️ Système", light: "☀️ Clair", dark: "🌙 Sombre" }
    : { aria: "Choose theme", system: "🖥️ System", light: "☀️ Light", dark: "🌙 Dark" };

  return (
    <Select
      id="theme-select"
      suppressHydrationWarning
      value={theme ?? "system"}
      onChange={(event) => setTheme(event.target.value)}
      aria-label={labels.aria}
      className="w-auto min-w-28"
    >
      <option value="system">{labels.system}</option>
      <option value="light">{labels.light}</option>
      <option value="dark">{labels.dark}</option>
    </Select>
  );
}
