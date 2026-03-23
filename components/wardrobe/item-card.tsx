import React from "react";
import Link from "next/link";
import { formatCategoryLabel } from "@/lib/items/presentation";

type ItemCardProps = {
  id: string;
  title: string;
  category: string;
  color: string;
  imageUrl?: string;
  tone: string;
};

export function ItemCard({ id, title, category, color, imageUrl, tone }: ItemCardProps) {
  const categoryLabel = formatCategoryLabel(category);

  return (
    <Link
      href={`/items/${id}`}
      aria-label={`查看 ${title} 详情`}
      style={{
        display: "grid",
        gap: "10px",
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <article>
        {imageUrl ? (
          <div
            style={{
              aspectRatio: "3 / 4",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow:
                "0 20px 38px rgba(44, 31, 21, 0.12), inset 0 0 0 1px rgba(29, 27, 25, 0.06)"
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
              boxShadow:
                "0 20px 38px rgba(44, 31, 21, 0.12), inset 0 0 0 1px rgba(29, 27, 25, 0.06)"
            }}
          />
        )}

        <div style={{ display: "grid", gap: "4px", minHeight: "58px", padding: "2px 2px 0" }}>
          <strong style={{ fontSize: "17px", lineHeight: 1.2 }}>{title}</strong>
          <span style={{ color: "#6d6459", fontSize: "14px" }}>
            {categoryLabel} · {color}
          </span>
        </div>
      </article>
    </Link>
  );
}
