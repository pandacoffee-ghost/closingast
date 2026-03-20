import React from "react";

type DiscoverSectionProps = {
  title: string;
  description: string;
  items: string[];
};

export function DiscoverSection({ title, description, items }: DiscoverSectionProps) {
  return (
    <section
      style={{
        display: "grid",
        gap: "12px",
        padding: "18px",
        borderRadius: "22px",
        background: "#fffaf2",
        border: "1px solid #eadbc2"
      }}
    >
      <div style={{ display: "grid", gap: "4px" }}>
        <h2 style={{ margin: 0, fontSize: "20px" }}>{title}</h2>
        <p style={{ margin: 0, color: "#6d6459" }}>{description}</p>
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        {items.map((item) => (
          <div
            key={item}
            style={{
              padding: "12px 14px",
              borderRadius: "16px",
              background: "#f6edde",
              color: "#3a332d"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
