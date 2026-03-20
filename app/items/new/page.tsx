import React from "react";
import { DuplicateHints } from "@/components/items/duplicate-hints";
import { ItemForm } from "@/components/items/item-form";
import { rankDuplicateHints } from "@/lib/items/duplicate-hints";

export default async function NewItemPage() {
  const duplicateHints = rankDuplicateHints(
    {
      title: "米白针织开衫",
      category: "top",
      season: ["spring"],
      color: "cream",
      styleTags: ["commute"]
    },
    [
      {
        id: "sample-1",
        title: "米白开衫",
        category: "top",
        season: ["spring"],
        color: "cream",
        styleTags: ["commute"]
      },
      {
        id: "sample-2",
        title: "黑色西装外套",
        category: "outerwear",
        season: ["autumn"],
        color: "black",
        styleTags: ["commute"]
      }
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
