import type { ReactNode } from "react";

type CalculatorShellProps = {
  children: ReactNode;
  className?: string;
};

export function CalculatorShell({ children, className = "" }: CalculatorShellProps) {
  return (
    <section
      className={`rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm sm:p-8 ${className}`}
    >
      {children}
    </section>
  );
}
