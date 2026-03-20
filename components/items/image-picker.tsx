import React from "react";

export function ImagePicker() {
  return (
    <label
      htmlFor="images"
      style={{
        display: "grid",
        gap: "8px",
        padding: "18px",
        borderRadius: "20px",
        border: "1px dashed #c9b79b",
        background: "#fffaf2"
      }}
    >
      <span style={{ fontWeight: 600 }}>上传衣服图片</span>
      <span style={{ color: "#6d6459", fontSize: "14px" }}>支持拍照或相册选择</span>
      <input id="images" name="images" type="file" multiple accept="image/*" />
    </label>
  );
}
