import React from "react";

export default async function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "24px"
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fffaf2",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "0 20px 60px rgba(29, 27, 25, 0.08)"
        }}
      >
        <p style={{ margin: 0, color: "#67755a", fontSize: "14px" }}>轻量私人衣橱</p>
        <h1 style={{ margin: "12px 0 8px", fontSize: "32px", lineHeight: 1.1 }}>
          登录你的衣橱
        </h1>
        <p style={{ margin: 0, color: "#5b544e", lineHeight: 1.5 }}>
          输入邮箱，系统会发送一条登录链接到你的收件箱。
        </p>

        <form style={{ display: "grid", gap: "14px", marginTop: "24px" }}>
          <label htmlFor="email" style={{ display: "grid", gap: "8px", fontWeight: 600 }}>
            邮箱地址
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              style={{
                border: "1px solid #d8c7a8",
                borderRadius: "14px",
                padding: "14px 16px",
                fontSize: "16px"
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              border: 0,
              borderRadius: "999px",
              padding: "14px 18px",
              fontSize: "16px",
              fontWeight: 700,
              background: "#1d1b19",
              color: "#fffaf2"
            }}
          >
            发送登录链接
          </button>
        </form>
      </section>
    </main>
  );
}
