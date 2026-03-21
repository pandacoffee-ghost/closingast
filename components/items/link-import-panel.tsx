import React from "react";

export function LinkImportPanel() {
  return (
    <section
      style={{
        display: "grid",
        gap: "10px",
        padding: "18px",
        borderRadius: "20px",
        background: "rgba(255, 250, 242, 0.92)",
        border: "1px solid #eadbc2",
        boxShadow: "0 18px 34px rgba(45, 31, 17, 0.06)"
      }}
    >
      <h2 style={{ margin: 0, fontSize: "18px" }}>从商品链接导入</h2>
      <p style={{ margin: 0, color: "#6d6459", lineHeight: 1.5 }}>
        粘贴淘宝或京东商品链接。解析失败时也可以继续手动录入。
      </p>
      <input name="sourceUrl" placeholder="粘贴淘宝 / 京东商品链接" />
      <button
        type="button"
        style={{
          justifySelf: "start",
          border: 0,
          borderRadius: "999px",
          padding: "12px 16px",
          background: "#efe3ce",
          color: "#1d1b19",
          fontWeight: 700,
          boxShadow: "0 10px 18px rgba(64, 48, 34, 0.08)"
        }}
      >
        解析链接
      </button>
    </section>
  );
}
