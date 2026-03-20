import React from "react";
import { DuplicateHints } from "@/components/items/duplicate-hints";
import { getItemById } from "@/lib/items/queries";

type ItemDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { id } = await params;
  const item = await getItemById(id);

  return (
    <main style={{ minHeight: "100dvh", padding: "24px 20px", background: "#f4efe6" }}>
      <section style={{ display: "grid", gap: "20px", maxWidth: "560px", margin: "0 auto" }}>
        <div
          aria-hidden="true"
          style={{
            aspectRatio: "4 / 5",
            borderRadius: "28px",
            background: "linear-gradient(180deg, #f2e4d2, #d6bda2)"
          }}
        />

        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764" }}>{item.category}</span>
          <h1 style={{ margin: 0 }}>{item.title}</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            {item.color} · {item.season.join(" / ")}
          </p>
        </header>

        <section style={{ display: "grid", gap: "10px", padding: "18px", borderRadius: "22px", background: "#fffaf2" }}>
          <strong>来源</strong>
          <span>{item.sourcePlatform}</span>
          <strong>店铺</strong>
          <span>{item.storeName}</span>
          <strong>价格</strong>
          <span>{item.price}</span>
          <strong>备注</strong>
          <span>{item.notes}</span>
        </section>

        <DuplicateHints
          hints={[
            {
              id: "sample-hint",
              title: "米白开衫",
              score: 9,
              reasons: ["同类目", "同颜色"]
            }
          ]}
        />
      </section>
    </main>
  );
}
