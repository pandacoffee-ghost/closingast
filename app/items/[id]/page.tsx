import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { DeleteItemButton } from "@/components/items/delete-item-button";
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
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        gridTemplateRows: "1fr auto",
        background: "transparent"
      }}
    >
      <section style={{ padding: "28px 20px 40px", display: "grid", gap: "20px", maxWidth: "560px", margin: "0 auto" }}>
        <div
          aria-hidden="true"
          style={{
            aspectRatio: "4 / 5",
            borderRadius: "28px",
            background: "linear-gradient(180deg, #f2e4d2, #d6bda2)",
            boxShadow: "0 24px 48px rgba(44, 31, 21, 0.14)"
          }}
        />

        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764" }}>{item.category}</span>
          <h1 style={{ margin: 0 }}>{item.title}</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            {item.color} · {item.season.join(" / ")}
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gap: "10px",
            padding: "18px",
            borderRadius: "22px",
            background: "rgba(255, 250, 242, 0.92)"
          }}
        >
          <strong>来源</strong>
          <span>{item.sourcePlatform}</span>
          <strong>店铺</strong>
          <span>{item.storeName}</span>
          <strong>价格</strong>
          <span>{item.price}</span>
          <strong>备注</strong>
          <span>{item.notes}</span>
        </section>

        <DeleteItemButton itemId={item.id} />

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

      <BottomNav />
    </main>
  );
}
