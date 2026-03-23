import React from "react";

type ItemCardProps = {
  title: string;
  category: string;
  color: string;
  imageUrl?: string;
  tone: string;
};

export function ItemCard({ title, category, color, imageUrl, tone }: ItemCardProps) {
  return (
    <article style={{ display: "grid", gap: "10px" }}>
      {imageUrl ? (
        <div
          style={{
            aspectRatio: "3 / 4",
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 20px 38px rgba(44, 31, 21, 0.12), inset 0 0 0 1px rgba(29, 27, 25, 0.06)"
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          style={{
            aspectRatio: "3 / 4",
            borderRadius: "22px",
            background: tone,
            boxShadow: "0 20px 38px rgba(44, 31, 21, 0.12), inset 0 0 0 1px rgba(29, 27, 25, 0.06)"
          }}
        />
      )}

      <div style={{ display: "grid", gap: "4px", minHeight: "58px", padding: "2px 2px 0" }}>
        <strong style={{ fontSize: "17px", lineHeight: 1.2 }}>{title}</strong>
        <span style={{ color: "#6d6459", fontSize: "14px" }}>
          {category} · {color}
        </span>
      </div>
    </article>
  );
}
