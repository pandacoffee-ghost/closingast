import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { DeleteItemButton } from "@/components/items/delete-item-button";
import { formatSeasonLabel, getItemSourceDetails } from "@/lib/items/presentation";
import { getItemById } from "@/lib/items/queries";

type ItemDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { id } = await params;
  const item = await getItemById(id);
  const sourceDetails = getItemSourceDetails(item);

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
        {item.imageUrl ? (
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 24px 48px rgba(44, 31, 21, 0.14)"
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            style={{
              aspectRatio: "4 / 5",
              borderRadius: "28px",
              background: "linear-gradient(180deg, #f2e4d2, #d6bda2)",
              boxShadow: "0 24px 48px rgba(44, 31, 21, 0.14)"
            }}
          />
        )}

        <header style={{ display: "grid", gap: "8px" }}>
          <h1 style={{ margin: 0 }}>{item.title}</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            {item.color} · {formatSeasonLabel(item.season)}
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
          <span>{sourceDetails.label}</span>
          {sourceDetails.details.map((detail) => (
            <React.Fragment key={detail.label}>
              <strong>{detail.label}</strong>
              <span>{detail.value}</span>
            </React.Fragment>
          ))}
          <strong>备注</strong>
          <span>{item.notes}</span>
        </section>

        <DeleteItemButton itemId={item.id} />
      </section>

      <BottomNav />
    </main>
  );
}
