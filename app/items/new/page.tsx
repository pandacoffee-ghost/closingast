import React from "react";
import { DuplicateHints } from "@/components/items/duplicate-hints";
import { ItemForm } from "@/components/items/item-form";
import { rankDuplicateHints } from "@/lib/items/duplicate-hints";
import { getRecentItems } from "@/lib/items/queries";

export default async function NewItemPage() {
  const recentItems = await getRecentItems();
  const duplicateHints = rankDuplicateHints(
    {
      title: "米白针织开衫",
      category: "top",
      season: ["spring"],
      color: "cream",
      styleTags: ["commute"]
    },
    [
      ...recentItems.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category === "上装" ? "top" : item.category === "外套" ? "outerwear" : "top",
        season: item.season.map((value) =>
          value === "春" ? "spring" : value === "秋" ? "autumn" : "spring"
        ),
        color: item.color === "米白" ? "cream" : item.color.toLowerCase(),
        styleTags: item.styleTags.length > 0 ? item.styleTags : ["commute"]
      }))
    ]
  );

  return (
    <main style={{ minHeight: "100dvh", padding: "24px 20px", background: "#f4efe6" }}>
      <section style={{ display: "grid", gap: "18px", maxWidth: "520px", margin: "0 auto" }}>
        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764" }}>新增衣物</span>
          <h1 style={{ margin: 0 }}>录入一件新衣服</h1>
        </header>

        <ItemForm />
        <DuplicateHints hints={duplicateHints} />
      </section>
    </main>
  );
}
