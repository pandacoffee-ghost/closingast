import React from "react";

type ItemCardProps = {
  title: string;
  category: string;
  color: string;
  tone: string;
};

export function ItemCard({ title, category, color, tone }: ItemCardProps) {
  return (
    <article style={{ display: "grid", gap: "10px" }}>
      <div
        aria-hidden="true"
        style={{
          aspectRatio: "3 / 4",
          borderRadius: "22px",
          background: tone,
          boxShadow: "inset 0 0 0 1px rgba(29, 27, 25, 0.06)"
        }}
      />

      <div style={{ display: "grid", gap: "4px" }}>
        <strong>{title}</strong>
        <span style={{ color: "#6d6459", fontSize: "14px" }}>
          {category} · {color}
        </span>
      </div>
    </article>
  );
}
