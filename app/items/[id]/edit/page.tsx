import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ItemForm } from "@/components/items/item-form";
import { getItemById } from "@/lib/items/queries";

type EditItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditItemPage({ params }: EditItemPageProps) {
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
      <section
        style={{
          padding: "28px 20px 40px",
          display: "grid",
          gap: "18px",
          maxWidth: "520px",
          margin: "0 auto"
        }}
      >
        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764", letterSpacing: "0.04em" }}>编辑衣物</span>
          <h1 style={{ margin: 0, fontSize: "38px", lineHeight: 0.98 }}>修改这件衣服</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>可以更新标题、季节、颜色、备注和来源信息。</p>
        </header>

        <ItemForm
          itemId={item.id}
          initialValues={{
            title: item.title,
            category: item.category,
            season: item.season,
            color: item.color,
            styleTags: item.styleTags,
            sourceUrl: item.sourceUrl,
            imageUrl: item.imageUrl,
            notes: item.notes
          }}
        />
      </section>

      <BottomNav />
    </main>
  );
}
