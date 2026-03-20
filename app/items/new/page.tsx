import React from "react";
import { ItemForm } from "@/components/items/item-form";

export default async function NewItemPage() {
  return (
    <main style={{ minHeight: "100dvh", padding: "24px 20px", background: "#f4efe6" }}>
      <section style={{ display: "grid", gap: "18px", maxWidth: "520px", margin: "0 auto" }}>
        <header style={{ display: "grid", gap: "8px" }}>
          <span style={{ color: "#8b7764" }}>新增衣物</span>
          <h1 style={{ margin: 0 }}>录入一件新衣服</h1>
        </header>

        <ItemForm />
      </section>
    </main>
  );
}
