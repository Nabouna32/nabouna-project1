"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools/tools";
import { normalizeSearchText, searchTools } from "@/lib/tools/search";
import { getCategoryName, getMessages, isLocale } from "@/lib/i18n/config";
import { getToolDescription, getToolName } from "@/lib/tools/i18n";

type ToolSearchProps = {
  className?: string;
  placeholder?: string;
  locale?: string;
};

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return <>{text}</>;

  const normalizedText = normalizeSearchText(text);
  const matchIndex = normalizedText.indexOf(normalizedQuery);
  if (matchIndex < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, matchIndex)}
      <mark className="rounded bg-[var(--accent-soft)] px-0.5 text-[var(--foreground)]">
        {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
      </mark>
      {text.slice(matchIndex + normalizedQuery.length)}
    </>
  );
}

export default function ToolSearch({
  className = "",
  placeholder,
  locale: localeProp,
}: ToolSearchProps) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = localeProp ?? (isLocale(segment) ? segment : "fr");
  const t = getMessages(locale);
  const resolvedPlaceholder = placeholder ?? t.tools.searchPlaceholder;
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => searchTools(tools, query, locale).slice(0, 6), [query, locale]);
  const showResults = isFocused && query.trim().length > 0;

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      const search = document.getElementById("tool-search-container");
      if (search && !search.contains(target)) {
        setIsFocused(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function getToolHref(slug: string, categoryId: string) {
    return `/${locale}/outils/${categoryId}/${slug}`;
  }

  function openResult(index: number) {
    const result = results[index];
    if (!result) return;
    router.push(getToolHref(result.tool.slug, result.tool.categoryId));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
      return;
    }
    if (!showResults || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      openResult(activeIndex >= 0 ? activeIndex : 0);
    }
  }

  return (
    <div id="tool-search-container" className={`relative ${className}`}>
      <label htmlFor="tool-search" className="sr-only">{t.search.label}</label>
      <div className={`flex items-center rounded-2xl border bg-[var(--surface)] p-2 shadow-lg shadow-black/5 transition-all duration-200 ${isFocused ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/15" : "border-[var(--border)]"}`}>
        <span className="px-3 text-xl text-[var(--muted)]" aria-hidden="true">🔍</span>
        <input
          id="tool-search"
          type="search"
          value={query}
          placeholder={resolvedPlaceholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showResults}
          aria-controls="tool-search-results"
          aria-activedescendant={activeIndex >= 0 ? `tool-result-${activeIndex}` : undefined}
          onChange={(event) => { setQuery(event.target.value); setActiveIndex(-1); }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        />
        {query && (
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { setQuery(""); setActiveIndex(-1); setIsFocused(true); }} className="rounded-lg px-3 py-2 text-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]" aria-label={t.search.clear}>×</button>
        )}
        <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => openResult(0)} disabled={results.length === 0} className="hidden rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:block">{t.search.button}</button>
      </div>

      {showResults && (
        <div id="tool-search-results" role="listbox" className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl shadow-black/10">
          {results.length > 0 ? (
            <>
              <div className="flex items-center justify-between px-3 pb-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{t.search.suggestions}</p>
                <p className="text-xs text-[var(--muted)]">{results.length} {results.length === 1 ? t.search.resultOne : t.search.resultMany}</p>
              </div>
              {results.map(({ tool }, index) => (
                <a key={tool.id} id={`tool-result-${index}`} href={getToolHref(tool.slug, tool.categoryId)} role="option" aria-selected={activeIndex === index} onMouseEnter={() => setActiveIndex(index)} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${activeIndex === index ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--accent-soft)]"}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-xl">{tool.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--foreground)]"><HighlightMatch text={getToolName(tool, locale)} query={query} /></span>
                    <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">{getCategoryName(locale, tool.categoryId)} · {getToolDescription(tool, locale)}</span>
                  </span>
                  <span className="text-[var(--muted)]">→</span>
                </a>
              ))}
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-medium text-[var(--foreground)]">{t.search.none} « {query.trim()} »</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{t.search.hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
