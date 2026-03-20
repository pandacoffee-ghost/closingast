import React from "react";
import { DiscoverSection } from "@/components/discover/discover-section";
import { getPossibleDuplicates, getRecentItems } from "@/lib/items/queries";

export default async function DiscoverPage() {
  const recentItems = await getRecentItems();
  const duplicates = await getPossibleDuplicates();

  return (
    <main style={{ minHeight: "100dvh", padding: "24px 20px", background: "#f4efe6" }}>
      <section style={{ display: "grid", gap: "18px", maxWidth: "620px", margin: "0 auto" }}>
        <header style={{ display: "grid", gap: "6px" }}>
          <span style={{ color: "#8b7764" }}>整理视图</span>
          <h1 style={{ margin: 0 }}>发现</h1>
        </header>

        <DiscoverSection
          title="最近新增"
          description="最近录入的衣物，方便快速回看。"
          items={recentItems.map((item) => item.title)}
        />

        <DiscoverSection
          title="可能重复"
          description="优先检查这些和已有衣物相似的单品。"
          items={duplicates.map((item) => `${item.title} · ${item.reasons.join(" / ")}`)}
        />
      </section>
    </main>
  );
}
