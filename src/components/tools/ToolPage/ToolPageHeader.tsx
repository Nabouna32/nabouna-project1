"use client";

import { usePathname } from "next/navigation";
import { getToolDescription, getToolName } from "@/lib/tools/i18n";
import { tools } from "@/lib/tools/tools";
import { isLocale } from "@/lib/i18n/config";

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
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const segmentLocale = segments[0];
  const locale = isLocale(segmentLocale) ? segmentLocale : "fr";
  const slug = segments.at(-1);
  const tool = tools.find((item) => item.slug === slug);
  const localizedTitle = tool ? getToolName(tool, locale) : title;
  const localizedDescription = tool ? getToolDescription(tool, locale) : description;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-2xl">
          {icon}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {localizedTitle}
        </h1>
      </div>

      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
        {localizedDescription}
      </p>
    </div>
  );
}