import type { ReactNode } from "react";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { getToolContent } from "@/lib/tools/types";
import ToolPageHeader from "./ToolPageHeader";
import ToolProcessingStatus from "./ToolProcessingStatus";
import { tools } from "@/lib/tools/tools";

export default function ToolPage({ toolId, locale = defaultLocale, children, content }: { toolId: string; locale?: Locale; children?: ReactNode; content?: ReactNode }) {
  const tool = tools.find((item) => item.id === toolId);
  if (!tool) throw new Error("Unknown tool id: " + toolId);
  const localizedContent = getToolContent(tool, locale);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <ToolPageHeader icon={tool.icon} title={localizedContent.name} description={localizedContent.description} />
      <div className="mt-5">
        <ToolProcessingStatus processing={tool.processing} locale={locale} />
      </div>
      {children && <div className="mt-6">{children}</div>}
      {content && <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-12">{content}</div>}
    </main>
  );
}
