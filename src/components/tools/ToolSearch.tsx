"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { tools } from "@/lib/tools/tools";
import { searchTools } from "@/lib/tools/search";

const categoryNames: Record<string, string> = {
  calculs: "Calculs",
  dates: "Dates & temps",
  informatique: "Informatique",
  fichiers: "PDF & fichiers",
  video: "Vidéo",
};

type ToolSearchProps = {
  className?: string;
  placeholder?: string;
};

export default function ToolSearch({
  className = "",
  placeholder = "Que recherchez-vous ?",
}: ToolSearchProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => searchTools(tools, query).slice(0, 6), [query]);
  const showResults = isFocused && query.trim().length > 0;
  const locale = pathname.split("/")[1] || "fr";

  function getToolHref(slug: string, categoryId: string) {
    return `/${locale}/outils/${categoryId}/${slug}`;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showResults || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      window.location.href = getToolHref(
        results[activeIndex].tool.slug,
        results[activeIndex].tool.categoryId,
      );
    }

    if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div className={`relative ${className}`}>
      <label htmlFor="tool-search" className="sr-only">
        Rechercher un outil
      </label>

      <div
        className={`flex items-center rounded-2xl border bg-[var(--surface)] p-2 shadow-lg shadow-black/5 transition-all duration-200 ${
          isFocused
            ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/15"
            : "border-[var(--border)]"
        }`}
      >
        <span className="px-3 text-xl text-[var(--muted)]" aria-hidden="true">
          🔍
        </span>

        <input
          id="tool-search"
          type="search"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showResults}
          aria-controls="tool-search-results"
          aria-activedescendant={
            activeIndex >= 0 ? `tool-result-${activeIndex}` : undefined
          }
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        />

        {query && (
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setQuery("");
              setActiveIndex(-1);
            }}
            className="rounded-lg px-3 py-2 text-lg text-[var(--muted)] transition-colors hover:bg-[var(--background)] hover:text-[var(--foreground)]"
            aria-label="Effacer la recherche"
          >
            ×
          </button>
        )}

        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (results.length > 0) {
              window.location.href = getToolHref(
                results[0].tool.slug,
                results[0].tool.categoryId,
              );
            }
          }}
          className="hidden rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
        >
          Rechercher
        </button>
      </div>

      {showResults && (
        <div
          id="tool-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-2xl shadow-black/10"
        >
          {results.length > 0 ? (
            <>
              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Suggestions
              </p>
              {results.map(({ tool }, index) => (
                <a
                  key={tool.id}
                  id={`tool-result-${index}`}
                  href={getToolHref(tool.slug, tool.categoryId)}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                    activeIndex === index
                      ? "bg-[var(--accent-soft)]"
                      : "hover:bg-[var(--accent-soft)]"
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-xl">
                    {tool.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-[var(--foreground)]">
                      {tool.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-[var(--muted)]">
                      {categoryNames[tool.categoryId] ?? "Outil"} · {tool.description}
                    </span>
                  </span>
                  <span className="text-[var(--muted)]">→</span>
                </a>
              ))}
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-medium text-[var(--foreground)]">
                Aucun outil trouvé
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Essayez « TVA », « internet », « vidéo » ou « âge ».
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
