import React from "react";

const filters = ["春", "秋", "通勤", "米白"];

export function FilterBar() {
  return (
    <section style={{ display: "grid", gap: "14px" }}>
      <input
        aria-label="搜索衣物"
        placeholder="搜索白色针织 / 卡其风衣"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "18px",
          border: "1px solid #d8c7a8",
          fontSize: "16px",
          background: "#fffaf2"
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
              background: "#efe3ce",
              color: "#5d544a",
              fontSize: "14px"
            }}
          >
            {filter}
          </span>
        ))}
      </div>
    </section>
  );
}
