import type { ReactNode } from "react";
import ToolPageHeader from "./ToolPageHeader";

type ToolPageProps = {
  icon: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function ToolPage({
  icon,
  title,
  description,
  children,
}: ToolPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <ToolPageHeader
        icon={icon}
        title={title}
        description={description}
      />

      <div className="mt-10">{children}</div>
    </main>
  );
}