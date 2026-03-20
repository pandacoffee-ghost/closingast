import React from "react";
import { ItemCard } from "./item-card";

const sampleItems = [
  { title: "米白针织开衫", category: "上装", color: "米白", tone: "linear-gradient(180deg, #f3e6d5, #d9c5ae)" },
  { title: "卡其短风衣", category: "外套", color: "卡其", tone: "linear-gradient(180deg, #d9c4a1, #b38b68)" }
];

export function ItemGrid() {
  return (
    <section
      aria-label="衣物列表"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "18px"
      }}
    >
      {sampleItems.map((item) => (
        <ItemCard key={item.title} {...item} />
      ))}
    </section>
  );
}
