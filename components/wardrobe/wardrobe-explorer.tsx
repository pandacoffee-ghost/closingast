"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FilterBar } from "./filter-bar";
import { ItemGrid } from "./item-grid";

const tokenAliases: Record<string, string[]> = {
  spring: ["spring", "春"],
  summer: ["summer", "夏"],
  autumn: ["autumn", "秋"],
  winter: ["winter", "冬"],
  commute: ["commute", "通勤"],
  casual: ["casual", "休闲"],
  date: ["date", "约会"],
  sport: ["sport", "运动"]
};

function expandSearchTokens(values: string[]) {
  return values.flatMap((value) => {
    const normalized = value.trim().toLowerCase();
    const aliases = tokenAliases[normalized];

    if (aliases) {
      return aliases;
    }

    const reverseAliases = Object.values(tokenAliases).find((candidate) => candidate.includes(normalized));
    return reverseAliases ?? [normalized];
  });
}

type WardrobeExplorerItem = {
  id: string;
  title: string;
  category: string;
  color: string;
  season: string[];
  styleTags: string[];
  notes?: string;
  imageUrl?: string;
};

type WardrobeExplorerProps = {
  items: WardrobeExplorerItem[];
};

export function WardrobeExplorer({ items }: WardrobeExplorerProps) {
  const pageSize = 4;
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  function toggleFilter(value: string) {
    setActiveFilters((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  useEffect(() => {
    setVisibleCount(pageSize);
  }, [activeFilters, query]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.title,
        item.category,
        item.color,
        item.notes ?? "",
        ...expandSearchTokens(item.season),
        ...expandSearchTokens(item.styleTags)
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);
      const normalizedFilterTerms = new Set([
        item.color,
        ...expandSearchTokens(item.season),
        ...expandSearchTokens(item.styleTags)
      ]);

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every((filter) => normalizedFilterTerms.has(filter.toLowerCase()));

      return matchesQuery && matchesFilters;
    });
  }, [activeFilters, items, query]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredItems.length;

  return (
    <>
      <FilterBar
        query={query}
        activeFilters={activeFilters}
        onQueryChange={setQuery}
        onToggleFilter={toggleFilter}
      />
      <ItemGrid items={visibleItems} />
      {canLoadMore ? (
        <button
          type="button"
          onClick={() => setVisibleCount((current) => current + pageSize)}
          style={{
            justifySelf: "center",
            border: 0,
            borderRadius: "999px",
            padding: "12px 16px",
            background: "#efe3ce",
            color: "#1d1b19",
            fontWeight: 700,
            boxShadow: "0 10px 18px rgba(64, 48, 34, 0.08)"
          }}
        >
          继续加载
        </button>
      ) : null}
    </>
  );
}
