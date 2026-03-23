import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
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
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "transparent"
      }}
    >
      <section style={{ padding: "28px 20px 40px", display: "grid", gap: "18px", maxWidth: "520px", margin: "0 auto" }}>
        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764", letterSpacing: "0.04em" }}>新增衣物</span>
          <h1 style={{ margin: 0, fontSize: "38px", lineHeight: 0.98 }}>录入一件新衣服</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            可以先贴商品链接，也可以直接拍照上传，字段保持轻量。
          </p>
        </header>

        <ItemForm />
        <DuplicateHints hints={duplicateHints} />
      </section>

      <BottomNav />
    </main>
  );
}
