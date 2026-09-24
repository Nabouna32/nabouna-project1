import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  inputId: string;
  unit?: string;
};

export function TextField({
  label,
  inputId,
  unit,
  className = "",
  type = "text",
  inputMode,
  ...inputProps
}: TextFieldProps) {
  const resolvedInputMode = inputMode ?? (type === "number" ? "decimal" : undefined);

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          inputMode={resolvedInputMode}
          step={type === "number" ? "any" : undefined}
          {...inputProps}
          className={[
            "min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]",
            "focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
            unit ? "pr-12" : "",
            className,
          ].join(" ")}
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-[var(--muted)]">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
