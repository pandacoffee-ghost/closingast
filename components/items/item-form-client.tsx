"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkImportPanel } from "./link-import-panel";
import { ImagePicker } from "./image-picker";

export function ItemFormClient() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? "top"),
      season: [String(formData.get("season") ?? "spring")],
      color: String(formData.get("color") ?? "white"),
      styleTags: [String(formData.get("styleTag") ?? "commute")]
    };

    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setError("保存失败，请稍后再试");
      setIsSubmitting(false);
      return;
    }

    router.push("/wardrobe");
    router.refresh();
  }

  return (
    <form style={{ display: "grid", gap: "16px" }} onSubmit={handleSubmit}>
      <LinkImportPanel />
      <ImagePicker />

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        标题
        <input name="title" placeholder="例如：白色衬衫" required />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        类目
        <select name="category" defaultValue="top">
          <option value="top">上装</option>
          <option value="bottom">下装</option>
          <option value="dress">裙子</option>
          <option value="outerwear">外套</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        季节
        <select name="season" defaultValue="spring">
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        颜色
        <input name="color" placeholder="white / cream / black" defaultValue="white" required />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        场景标签
        <input name="styleTag" placeholder="commute / casual" defaultValue="commute" required />
      </label>

      {error ? (
        <p role="alert" style={{ margin: 0, color: "#b2441e" }}>
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          border: 0,
          borderRadius: "999px",
          padding: "14px 18px",
          fontWeight: 700,
          background: "linear-gradient(180deg, #2e261f 0%, #1d1b19 100%)",
          color: "#fffaf2",
          opacity: isSubmitting ? 0.7 : 1,
          boxShadow: "0 16px 28px rgba(29, 27, 25, 0.18)"
        }}
      >
        {isSubmitting ? "保存中..." : "保存"}
      </button>
    </form>
  );
}
