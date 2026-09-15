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
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-3xl">
        {icon}
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
        {title}
      </h1>

      <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}