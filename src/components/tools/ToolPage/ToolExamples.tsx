type ToolExample = {
  title: string;
  description: string;
};

type ToolExamplesProps = {
  examples: ToolExample[];
};

export default function ToolExamples({
  examples,
}: ToolExamplesProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {examples.map((example) => (
        <div
          key={example.title}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <h3 className="font-semibold text-[var(--foreground)]">
            {example.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {example.description}
          </p>
        </div>
      ))}
    </div>
  );
}