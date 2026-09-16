type ToolPageHeaderProps = {
  icon: string;
  title: string;
  description: string;
};

export default function ToolPageHeader({
  icon,
  title,
  description,
}: ToolPageHeaderProps) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
          {icon}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {title}
        </h1>
      </div>

      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}