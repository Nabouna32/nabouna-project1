import type { ReactNode } from "react";

type ToolSectionProps = {
  title: string;
  children: ReactNode;
};

export default function ToolSection({
  title,
  children,
}: ToolSectionProps) {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
      <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
        {title}
      </h2>

      <div className="mt-5 text-base leading-7 text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}