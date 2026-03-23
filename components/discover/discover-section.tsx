import React from "react";

type DiscoverSectionProps = {
  title: string;
  description: string;
  items: Array<{
    title: string;
    imageUrl?: string;
  }>;
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
            key={item.title}
            style={{
              display: "grid",
              gridTemplateColumns: item.imageUrl ? "48px 1fr" : "1fr",
              alignItems: "center",
              gap: "12px",
              padding: "12px 14px",
              borderRadius: "16px",
              background: "#f6edde",
              color: "#3a332d"
            }}
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
            ) : null}
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
