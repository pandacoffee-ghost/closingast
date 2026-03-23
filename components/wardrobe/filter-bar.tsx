import React from "react";

const filters = ["春", "秋", "通勤", "米白"];

type FilterBarProps = {
  query: string;
  activeFilters: string[];
  onQueryChange: (value: string) => void;
  onToggleFilter: (value: string) => void;
};

export function FilterBar({ query, activeFilters, onQueryChange, onToggleFilter }: FilterBarProps) {
  return (
    <section style={{ display: "grid", gap: "14px" }}>
      <input
        aria-label="搜索衣物"
        placeholder="搜索白色针织 / 卡其风衣"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        style={{
          boxShadow: "0 14px 28px rgba(45, 31, 17, 0.06)"
        }}
      />

      <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onToggleFilter(filter)}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 14px",
              borderRadius: "999px",
              background: activeFilters.includes(filter) ? "#1f1a16" : "rgba(239, 227, 206, 0.9)",
              color: activeFilters.includes(filter) ? "#fffaf2" : "#5d544a",
              fontSize: "14px",
              border: "1px solid rgba(64, 48, 34, 0.08)"
            }}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}
