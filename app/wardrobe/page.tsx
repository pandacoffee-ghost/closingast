import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { WardrobeExplorer } from "@/components/wardrobe/wardrobe-explorer";
import { getRecentItems } from "@/lib/items/queries";

export default async function WardrobePage() {
  const items = await getRecentItems();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "transparent"
      }}
    >
      <section style={{ padding: "28px 20px 12px", display: "grid", gap: "24px" }}>
        <header style={{ display: "grid", gap: "6px" }}>
          <span style={{ color: "#8b7764", fontSize: "14px", letterSpacing: "0.04em" }}>私人衣橱</span>
          <h1 style={{ margin: 0, fontSize: "40px", lineHeight: 0.96 }}>衣橱</h1>
          <p style={{ margin: 0, color: "#6d6459", maxWidth: "22rem" }}>
            用图片快速翻找已有衣物，把重复购买挡在下单之前。
          </p>
        </header>

        <WardrobeExplorer items={items} />
      </section>

      <BottomNav />
    </main>
  );
}
