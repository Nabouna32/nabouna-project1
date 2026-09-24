import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  inputId: string;
};

export function TextArea({ label, inputId, className = "", ...props }: TextAreaProps) {
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-[var(--foreground)]"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        className={[
          "min-h-56 w-full resize-y rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]",
          "focus-visible:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
          className,
        ].join(" ")}
        {...props}
      />
    </div>
  );
}
