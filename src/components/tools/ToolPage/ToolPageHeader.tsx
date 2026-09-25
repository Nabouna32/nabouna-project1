type ToolPageHeaderProps = { icon: string; title: string; description: string };

export default function ToolPageHeader({ icon, title, description }: ToolPageHeaderProps) {
  return (
    <header className="py-2 sm:py-3">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl sm:h-12 sm:w-12 sm:text-3xl" aria-hidden="true">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Utiluna</p>
          <h1 className="mt-0.5 text-2xl font-black tracking-[-0.035em] sm:text-3xl lg:text-4xl">{title}</h1>
          <p className="mt-1.5 max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base">{description}</p>
        </div>
      </div>
    </header>
  );
}
