import React from "react";
import { ItemCard } from "./item-card";

type ItemGridItem = {
  id: string;
  title: string;
  category: string;
  color: string;
  season: string[];
  styleTags: string[];
  imageUrl?: string;
};

const tones = [
  "linear-gradient(180deg, #f3e6d5, #d9c5ae)",
  "linear-gradient(180deg, #d9c4a1, #b38b68)",
  "linear-gradient(180deg, #e7e0d6, #cdb7a2)"
];

type ItemGridProps = {
  items: ItemGridItem[];
};

export function ItemGrid({ items }: ItemGridProps) {
  return (
    <section
      aria-label="衣物列表"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: "18px"
      }}
    >
      {items.map((item, index) => (
        <ItemCard
          key={item.id}
          id={item.id}
          title={item.title}
          category={item.category}
          color={item.color}
          imageUrl={item.imageUrl}
          tone={tones[index % tones.length]}
        />
      ))}
    </section>
  );
}
