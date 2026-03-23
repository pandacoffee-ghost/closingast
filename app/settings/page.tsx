import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { formatCategoryLabel } from "@/lib/items/presentation";
import { getWardrobeStats } from "@/lib/items/queries";

export default async function SettingsPage() {
  const stats = await getWardrobeStats();
  const maxCategoryCount = Math.max(...stats.categoryBreakdown.map((item) => item.count), 1);
  const maxColorCount = Math.max(...stats.colorBreakdown.map((item) => item.count), 1);

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
          maxWidth: "620px",
          margin: "0 auto"
        }}
      >
        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764", letterSpacing: "0.04em" }}>衣橱统计</span>
          <h1 style={{ margin: 0, fontSize: "38px", lineHeight: 0.98 }}>我的</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            一眼看清楚你有多少件衣服、什么颜色最多、哪类衣服最容易越买越多。
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gap: "12px"
          }}
        >
          <article
            style={{
              display: "grid",
              gap: "8px",
              padding: "18px",
              borderRadius: "22px",
              background: "rgba(255, 250, 242, 0.92)",
              border: "1px solid #eadbc2"
            }}
          >
            <span style={{ color: "#8b7764", fontSize: "14px" }}>衣物总数</span>
            <strong style={{ fontSize: "34px", lineHeight: 1 }}>{stats.totalCount}</strong>
          </article>
        </section>

        <section
          style={{
            display: "grid",
            gap: "14px",
            padding: "18px",
            borderRadius: "22px",
            background: "rgba(255, 250, 242, 0.92)",
            border: "1px solid #eadbc2"
          }}
        >
          <strong>类目分布</strong>
          {stats.categoryBreakdown.map((item) => (
            <div key={item.label} style={{ display: "grid", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <span>{formatCategoryLabel(item.label)}</span>
                <span>{item.count}</span>
              </div>
              <div style={{ height: "10px", borderRadius: "999px", background: "#f2e6d6" }}>
                <div
                  style={{
                    width: `${(item.count / maxCategoryCount) * 100}%`,
                    height: "100%",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #c89f72, #8f5e3a)"
                  }}
                />
              </div>
            </div>
          ))}
        </section>

        <section
          style={{
            display: "grid",
            gap: "14px",
            padding: "18px",
            borderRadius: "22px",
            background: "rgba(255, 250, 242, 0.92)",
            border: "1px solid #eadbc2"
          }}
        >
          <strong>颜色分布</strong>
          {stats.colorBreakdown.map((item) => (
            <div key={item.label} style={{ display: "grid", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
                <span>{item.label}</span>
                <span>{item.count}</span>
              </div>
              <div style={{ height: "10px", borderRadius: "999px", background: "#f2e6d6" }}>
                <div
                  style={{
                    width: `${(item.count / maxColorCount) * 100}%`,
                    height: "100%",
                    borderRadius: "999px",
                    background: "linear-gradient(90deg, #d0baa1, #8e7152)"
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      </section>

      <BottomNav />
    </main>
  );
}
