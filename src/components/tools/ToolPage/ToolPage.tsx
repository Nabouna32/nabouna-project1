import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getToolContent } from "@/lib/tools/types";
import ToolPageHeader from "./ToolPageHeader";
import ToolProcessingStatus from "./ToolProcessingStatus";
import { tools } from "@/lib/tools/tools";

type ToolPageProps = {
  toolId: string;
  locale?: Locale;
  children?: ReactNode;
  content?: ReactNode;
};

export default function ToolPage({
  toolId,
  locale = defaultLocale,
  children,
  content,
}: ToolPageProps) {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) throw new Error(`Unknown tool id: ${toolId}`);

  const localizedContent = getToolContent(tool, locale);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <ToolPageHeader
        icon={tool.icon}
        title={localizedContent.name}
        description={localizedContent.description}
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
