import React from "react";

const filters = ["春", "秋", "通勤", "米白"];

export function FilterBar() {
  return (
    <section style={{ display: "grid", gap: "14px" }}>
      <input
        aria-label="搜索衣物"
        placeholder="搜索白色针织 / 卡其风衣"
        style={{
          boxShadow: "0 14px 28px rgba(45, 31, 17, 0.06)"
        }}
      />

      <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
        {filters.map((filter) => (
          <span
            key={filter}
            style={{
              whiteSpace: "nowrap",
              padding: "8px 14px",
              borderRadius: "999px",
              background: "rgba(239, 227, 206, 0.9)",
              color: "#5d544a",
              fontSize: "14px",
              border: "1px solid rgba(64, 48, 34, 0.08)"
            }}
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}
