import React from "react";
import { ImagePicker } from "./image-picker";

export function ItemForm() {
  return (
    <form style={{ display: "grid", gap: "16px" }}>
      <ImagePicker />

      <label style={{ display: "grid", gap: "8px" }}>
        标题
        <input name="title" placeholder="例如：白色衬衫" />
      </label>

      <label style={{ display: "grid", gap: "8px" }}>
        类目
        <select name="category" defaultValue="top">
          <option value="top">上装</option>
          <option value="bottom">下装</option>
          <option value="dress">裙子</option>
          <option value="outerwear">外套</option>
        </select>
      </label>

      <button
        type="submit"
        style={{
          border: 0,
          borderRadius: "999px",
          padding: "14px 18px",
          fontWeight: 700,
          background: "#1d1b19",
          color: "#fffaf2"
        }}
      >
        保存
      </button>
    </form>
  );
}
