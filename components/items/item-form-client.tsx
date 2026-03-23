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
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [sourceUrl, setSourceUrl] = useState(initialValues?.sourceUrl ?? "");
  const [color, setColor] = useState(initialValues?.color ?? "白色");
  const [styleTag, setStyleTag] = useState(initialValues?.styleTags?.[0] ?? "");
  const [notes, setNotes] = useState(initialValues?.notes ?? "");
  const [importSummary, setImportSummary] = useState<string | null>(null);
  const [importedStoreName, setImportedStoreName] = useState<string | undefined>(undefined);
  const [importedPrice, setImportedPrice] = useState<string | undefined>(undefined);
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

  async function handleImport() {
    if (!sourceUrl.trim()) {
      setImportSummary("先粘贴商品链接再解析");
      return;
    }

    setIsImporting(true);
    setImportSummary(null);

    const response = await fetch("/api/import", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ url: sourceUrl.trim() })
    });

    if (!response.ok) {
      setImportSummary("链接解析失败，请继续手动录入");
      setIsImporting(false);
      return;
    }

    const result = await response.json();

    if (result.mode === "success") {
      setTitle(result.title ?? "");
      setPreviewUrl(result.imageUrl ?? null);
      setImportedStoreName(result.storeName ?? undefined);
      setImportedPrice(result.priceText ?? undefined);
      setImportSummary(
        [result.platform === "taobao" ? "淘宝" : "京东", result.storeName, result.priceText]
          .filter(Boolean)
          .join(" · ")
      );
    } else {
      setImportSummary("没有解析出完整商品信息，已保留原链接，可继续手动录入");
    }

    setIsImporting(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const normalizedStyleTag = String(formData.get("styleTag") ?? "").trim();
    const normalizedSourceUrl = String(formData.get("sourceUrl") ?? "").trim();
    const sourcePlatform = detectSourcePlatform(normalizedSourceUrl);
    const payload = {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? initialValues?.category ?? "top"),
      season: [String(formData.get("season") ?? initialValues?.season?.[0] ?? "spring")],
      color: String(formData.get("color") ?? initialValues?.color ?? "白色"),
      styleTags: normalizedStyleTag ? [normalizedStyleTag] : [],
      imageDataUrl: previewUrl ?? undefined,
      sourceUrl: normalizedSourceUrl,
      sourcePlatform,
      storeName: importedStoreName,
      price: importedPrice,
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
      <LinkImportPanel
        defaultValue={sourceUrl}
        isImporting={isImporting}
        onImport={handleImport}
        onSourceUrlChange={setSourceUrl}
        importSummary={importSummary}
      />
      <ImagePicker previewUrl={previewUrl} onChange={handleImageChange} />

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        标题
        <input
          name="title"
          placeholder="例如：白色衬衫"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
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
          value={color}
          onChange={(event) => setColor(event.target.value)}
          required
        />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        场景标签
        <input
          name="styleTag"
          placeholder="例如：通勤 / 休闲 / 约会（可不填）"
          value={styleTag}
          onChange={(event) => setStyleTag(event.target.value)}
        />
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        备注
        <textarea
          name="notes"
          placeholder="例如：版型偏宽松、适合春秋通勤"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
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
