import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { DiscoverSection } from "@/components/discover/discover-section";
import { getPossibleDuplicates, getRecentItems } from "@/lib/items/queries";

export default async function DiscoverPage() {
  const recentItems = await getRecentItems();
  const duplicates = await getPossibleDuplicates();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "transparent"
      }}
    >
      <section style={{ padding: "28px 20px 40px", display: "grid", gap: "18px", maxWidth: "620px", margin: "0 auto" }}>
        <header style={{ display: "grid", gap: "6px" }}>
          <span style={{ color: "#8b7764", letterSpacing: "0.04em" }}>整理视图</span>
          <h1 style={{ margin: 0, fontSize: "38px", lineHeight: 0.98 }}>发现</h1>
          <p style={{ margin: 0, color: "#6d6459", maxWidth: "28rem" }}>
            把最近新增、可能重复和待整理衣物集中到更容易扫视的位置。
          </p>
        </header>

        <DiscoverSection
          title="最近新增"
          description="最近录入的衣物，方便快速回看。"
          items={recentItems.map((item) => ({ title: item.title, imageUrl: item.imageUrl }))}
        />

        <DiscoverSection
          title="可能重复"
          description="优先检查这些和已有衣物相似的单品。"
          items={duplicates.map((item) => ({
            title: `${item.title} · ${item.reasons.join(" / ")}`,
            imageUrl: item.imageUrl
          }))}
        />
      </section>

      <BottomNav />
    </main>
  );
}
