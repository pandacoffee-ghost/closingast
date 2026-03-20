import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FilterBar } from "@/components/wardrobe/filter-bar";
import { ItemGrid } from "@/components/wardrobe/item-grid";

export default async function WardrobePage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "radial-gradient(circle at top, #f7f1e8 0%, #f4efe6 45%, #efe5d4 100%)"
      }}
    >
      <section style={{ padding: "24px 20px 12px", display: "grid", gap: "22px" }}>
        <header style={{ display: "grid", gap: "6px" }}>
          <span style={{ color: "#8b7764", fontSize: "14px" }}>私人衣橱</span>
          <h1 style={{ margin: 0, fontSize: "36px", lineHeight: 1 }}>衣橱</h1>
        </header>

        <FilterBar />
        <ItemGrid />
      </section>

      <BottomNav />
    </main>
  );
}
