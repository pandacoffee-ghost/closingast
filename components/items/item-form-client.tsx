"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LinkImportPanel } from "./link-import-panel";
import { ImagePicker } from "./image-picker";
import { inferFieldsFromTitle } from "@/lib/imports/title-inference";

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
  const [isRecognizingImage, setIsRecognizingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [sourceUrl, setSourceUrl] = useState(initialValues?.sourceUrl ?? "");
  const [category, setCategory] = useState(initialValues?.category ?? "top");
  const [season, setSeason] = useState(initialValues?.season?.[0] ?? "spring");
  const [color, setColor] = useState(initialValues?.color ?? "白色");
  const [styleTag, setStyleTag] = useState(initialValues?.styleTags?.[0] ?? "");
  const [notes, setNotes] = useState(initialValues?.notes ?? "");
  const [importSummary, setImportSummary] = useState<string | null>(null);
  const [recognitionSummary, setRecognitionSummary] = useState<string | null>(null);
  const [importedStoreName, setImportedStoreName] = useState<string | undefined>(undefined);
  const [importedPrice, setImportedPrice] = useState<string | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValues?.imageUrl ?? null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [recognizedFields, setRecognizedFields] = useState<Record<string, boolean>>({});
  const [conflictedFields, setConflictedFields] = useState<Record<string, boolean>>({});

  function markTouched(field: string) {
    setTouchedFields((current) => ({
      ...current,
      [field]: true
    }));
    setRecognizedFields((current) => ({
      ...current,
      [field]: false
    }));
  }

  function applyRecognizedValue(
    field: string,
    value: string | undefined,
    currentValue: string,
    apply: (next: string) => void
  ) {
    if (!value) {
      return;
    }

    if (touchedFields[field]) {
      setConflictedFields((current) => ({
        ...current,
        [field]: value !== currentValue
      }));
      return;
    }

    apply(value);
    setRecognizedFields((current) => ({
      ...current,
      [field]: true
    }));
    setConflictedFields((current) => ({
      ...current,
      [field]: false
    }));
  }

  function renderFieldLabel(label: string, field: string) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <span>{label}</span>
        {recognizedFields[field] ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "999px",
              padding: "2px 8px",
              background: "#efe3ce",
              color: "#5d4932",
              fontSize: "12px",
              fontWeight: 700
            }}
          >
            AI建议
          </span>
        ) : null}
      </span>
    );
  }

  async function recognizeImage(imageDataUrl: string) {
    setIsRecognizingImage(true);
    setRecognitionSummary("识别中...");

    try {
      const response = await fetch("/api/vision/extract-item", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ imageDataUrl })
      });

      if (!response.ok) {
        setRecognitionSummary("图片识别失败，请手动填写");
        return;
      }

      const result = await response.json();
      applyRecognizedValue("title", result.title, title, setTitle);
      applyRecognizedValue("category", result.category, category, setCategory);
      applyRecognizedValue("color", result.color, color, setColor);
      applyRecognizedValue("styleTag", result.styleTags?.[0], styleTag, setStyleTag);
      applyRecognizedValue("notes", result.description, notes, setNotes);
      applyRecognizedValue("season", result.seasons?.[0], season, setSeason);
      setRecognitionSummary("已识别建议，可继续手动修改");
    } catch {
      setRecognitionSummary("图片识别失败，请手动填写");
    } finally {
      setIsRecognizingImage(false);
    }
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const nextPreviewUrl = typeof reader.result === "string" ? reader.result : null;
      setPreviewUrl(nextPreviewUrl);

      if (nextPreviewUrl) {
        void recognizeImage(nextPreviewUrl);
      }
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
      const inferredFields = inferFieldsFromTitle(result.title ?? "");
      setPreviewUrl(result.imageUrl ?? null);
      setImportedStoreName(result.storeName ?? undefined);
      setImportedPrice(result.priceText ?? undefined);
      if (inferredFields.color) {
        setColor(inferredFields.color);
      }
      if (inferredFields.category) {
        setCategory(inferredFields.category);
      }
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
      category: String(formData.get("category") ?? category),
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
      {recognitionSummary ? (
        <p aria-live="polite" style={{ margin: 0, color: "#6d6459", fontSize: "14px" }}>
          {isRecognizingImage ? "图片识别中..." : recognitionSummary}
        </p>
      ) : null}
      {previewUrl ? (
        <button
          type="button"
          onClick={() => void recognizeImage(previewUrl)}
          disabled={isRecognizingImage}
          style={{
            justifySelf: "start",
            border: 0,
            borderRadius: "999px",
            padding: "10px 14px",
            background: "#efe3ce",
            color: "#1d1b19",
            fontWeight: 700,
            boxShadow: "0 10px 18px rgba(64, 48, 34, 0.08)",
            opacity: isRecognizingImage ? 0.7 : 1
          }}
        >
          {isRecognizingImage ? "识别中..." : "重新识别"}
        </button>
      ) : null}

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("标题", "title")}
        <input
          name="title"
          placeholder="例如：白色衬衫"
          value={title}
          onChange={(event) => {
            markTouched("title");
            setTitle(event.target.value);
          }}
          required
        />
        {conflictedFields.title ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("类目", "category")}
        <select
          name="category"
          value={category}
          onChange={(event) => {
            markTouched("category");
            setCategory(event.target.value);
          }}
        >
          <option value="top">上装</option>
          <option value="bottom">下装</option>
          <option value="dress">裙子</option>
          <option value="outerwear">外套</option>
        </select>
        {conflictedFields.category ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("季节", "season")}
        <select
          name="season"
          value={season}
          onChange={(event) => {
            markTouched("season");
            setSeason(event.target.value);
          }}
        >
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
        {conflictedFields.season ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("颜色", "color")}
        <input
          name="color"
          placeholder="例如：白色 / 米白 / 卡其"
          value={color}
          onChange={(event) => {
            markTouched("color");
            setColor(event.target.value);
          }}
          required
        />
        {conflictedFields.color ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("场景标签", "styleTag")}
        <input
          name="styleTag"
          placeholder="例如：通勤 / 休闲 / 约会（可不填）"
          value={styleTag}
          onChange={(event) => {
            markTouched("styleTag");
            setStyleTag(event.target.value);
          }}
        />
        {conflictedFields.styleTag ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
      </label>

      <label style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
        {renderFieldLabel("备注", "notes")}
        <textarea
          name="notes"
          placeholder="例如：版型偏宽松、适合春秋通勤"
          value={notes}
          onChange={(event) => {
            markTouched("notes");
            setNotes(event.target.value);
          }}
          rows={4}
        />
        {conflictedFields.notes ? (
          <span style={{ fontSize: "13px", color: "#8a5a22", fontWeight: 500 }}>
            有新的识别建议，已保留你的手动填写
          </span>
        ) : null}
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
