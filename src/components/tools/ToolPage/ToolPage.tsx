import type { ReactNode } from "react";
import ToolPageHeader from "./ToolPageHeader";
import ToolProcessingStatus from "./ToolProcessingStatus";
import { tools } from "@/lib/tools/tools";

type ToolPageProps = {
  toolId: string;
  icon: string;
  title: string;
  description: string;
  children?: ReactNode;
  content?: ReactNode;
};

export default function ToolPage({
  icon,
  title,
  description,
  children,
  content,
  toolId,
}: ToolPageProps) {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) throw new Error(`Unknown tool id: ${toolId}`);
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <ToolPageHeader
        icon={icon}
        title={title}
        description={description}
      />

      <div className="mt-8">
        <ToolProcessingStatus processing={tool.processing} />
      </div>

      {children && <div className="mt-8">{children}</div>}

      {content && (
        <div className="mt-16 space-y-12">
          {content}
        </div>
      )}
    </main>
  );
}
