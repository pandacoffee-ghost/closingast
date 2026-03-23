"use client";

import React, { useMemo, useState } from "react";
import { FilterBar } from "./filter-bar";
import { ItemGrid } from "./item-grid";

type WardrobeExplorerItem = {
  id: string;
  title: string;
  category: string;
  color: string;
  season: string[];
  styleTags: string[];
  imageUrl?: string;
};

type WardrobeExplorerProps = {
  items: WardrobeExplorerItem[];
};

export function WardrobeExplorer({ items }: WardrobeExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  function toggleFilter(value: string) {
    setActiveFilters((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [item.title, item.category, item.color, ...item.season, ...item.styleTags]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every(
          (filter) =>
            item.color.includes(filter) || item.season.includes(filter) || item.styleTags.includes(filter)
        );

      return matchesQuery && matchesFilters;
    });
  }, [activeFilters, items, query]);

  return (
    <>
      <FilterBar
        query={query}
        activeFilters={activeFilters}
        onQueryChange={setQuery}
        onToggleFilter={toggleFilter}
      />
      <ItemGrid items={filteredItems} />
    </>
  );
}
