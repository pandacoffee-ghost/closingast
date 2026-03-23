import React from "react";

type ImagePickerProps = {
  previewUrl?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ImagePicker({ previewUrl, onChange }: ImagePickerProps) {
  return (
    <label
      htmlFor="images"
      style={{
        display: "grid",
        gap: "8px",
        padding: "18px",
        borderRadius: "20px",
        border: "1px dashed #c9b79b",
        background: "rgba(255, 250, 242, 0.94)"
      }}
    >
      <span id="image-picker-label" style={{ fontWeight: 600 }}>
        上传衣服图片
      </span>
      <span style={{ color: "#6d6459", fontSize: "14px" }}>支持拍照或相册选择</span>
      {previewUrl ? (
        <div
          style={{
            width: "100%",
            aspectRatio: "4 / 5",
            borderRadius: "18px",
            overflow: "hidden",
            background: "#efe3ce",
            border: "1px solid rgba(64, 48, 34, 0.08)"
          }}
        >
          <img
            src={previewUrl}
            alt="上传预览"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ) : null}
      <input
        id="images"
        name="images"
        type="file"
        multiple
        accept="image/*"
        aria-labelledby="image-picker-label"
        onChange={onChange}
      />
    </label>
  );
}
