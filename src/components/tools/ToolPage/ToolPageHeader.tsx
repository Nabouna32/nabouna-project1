type ToolPageHeaderProps = { icon: string; title: string; description: string };

export default function ToolPageHeader({ icon, title, description }: ToolPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/8 blur-3xl" />
      <div className="relative max-w-3xl">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.25rem] bg-[var(--accent-soft)] text-3xl shadow-sm sm:h-16 sm:w-16 sm:text-4xl">{icon}</div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Utiluna</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">{title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
