import React from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";

export default async function SettingsPage() {
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
          <span style={{ color: "#8b7764", letterSpacing: "0.04em" }}>个人中心</span>
          <h1 style={{ margin: 0, fontSize: "38px", lineHeight: 0.98 }}>我的</h1>
          <p style={{ margin: 0, color: "#6d6459" }}>
            这里放账号、标签、环境信息和后续的备份入口。
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gap: "12px",
            padding: "18px",
            borderRadius: "22px",
            background: "rgba(255, 250, 242, 0.92)",
            border: "1px solid #eadbc2"
          }}
        >
          <strong>本地环境</strong>
          <span>Supabase 本地开发已接入</span>
          <span>后续可在这里补账号信息、标签管理和数据导出。</span>
        </section>
      </section>

      <BottomNav />
    </main>
  );
}
