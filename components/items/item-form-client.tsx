"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkImportPanel } from "./link-import-panel";
import { ImagePicker } from "./image-picker";

function detectSourcePlatform(sourceUrl: string) {
  if (sourceUrl.includes("taobao.com")) {
    return "taobao";
  }

  if (sourceUrl.includes("jd.com")) {
    return "jd";
  }

  return "manual";
}

type ItemFormClientProps = {
  itemId?: string;
  initialValues?: {
    title?: string;
    category?: string;
    season?: string[];
    color?: string;
    styleTags?: string[];
    sourceUrl?: string;
    imageUrl?: string;
    notes?: string;
  };
};

export function ItemFormClient({ itemId, initialValues }: ItemFormClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.imageUrl ?? null);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const styleTag = String(formData.get("styleTag") ?? "").trim();
    const sourceUrl = String(formData.get("sourceUrl") ?? "").trim();
    const sourcePlatform = detectSourcePlatform(sourceUrl);
    const payload = {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? initialValues?.category ?? "top"),
      season: [String(formData.get("season") ?? initialValues?.season?.[0] ?? "spring")],
      color: String(formData.get("color") ?? initialValues?.color ?? "白色"),
      styleTags: styleTag ? [styleTag] : [],
      imageDataUrl: previewUrl ?? undefined,
      sourceUrl,
      sourcePlatform,
      notes: String(formData.get("notes") ?? "").trim() || undefined
    };

    const response = await fetch(itemId ? `/api/items/${itemId}` : "/api/items", {
      method: itemId ? "PATCH" : "POST",
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
      <LinkImportPanel defaultValue={initialValues?.sourceUrl} />
      <ImagePicker previewUrl={previewUrl} onChange={handleImageChange} />

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        标题
        <input
          name="title"
          placeholder="例如：白色衬衫"
          defaultValue={initialValues?.title ?? ""}
          required
        />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        类目
        <select name="category" defaultValue={initialValues?.category ?? "top"}>
          <option value="top">上装</option>
          <option value="bottom">下装</option>
          <option value="dress">裙子</option>
          <option value="outerwear">外套</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        季节
        <select name="season" defaultValue={initialValues?.season?.[0] ?? "spring"}>
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        颜色
        <input
          name="color"
          placeholder="例如：白色 / 米白 / 卡其"
          defaultValue={initialValues?.color ?? "白色"}
          required
        />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        场景标签
        <input
          name="styleTag"
          placeholder="例如：通勤 / 休闲 / 约会（可不填）"
          defaultValue={initialValues?.styleTags?.[0] ?? ""}
        />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        备注
        <textarea
          name="notes"
          placeholder="例如：版型偏宽松、适合春秋通勤"
          defaultValue={initialValues?.notes ?? ""}
          rows={4}
        />
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
        {isSubmitting ? "保存中..." : itemId ? "保存修改" : "保存"}
      </button>
    </form>
  );
}
