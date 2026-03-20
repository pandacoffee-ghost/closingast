import React from "react";

const items = [
  { label: "衣橱", href: "/wardrobe" },
  { label: "新增", href: "/items/new" },
  { label: "发现", href: "/discover" },
  { label: "我的", href: "/settings" }
];

export function BottomNav() {
  return (
    <nav
      aria-label="底部导航"
      style={{
        position: "sticky",
        bottom: 0,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "8px",
        padding: "12px 16px 20px",
        borderTop: "1px solid rgba(29, 27, 25, 0.08)",
        background: "rgba(255, 250, 242, 0.95)",
        backdropFilter: "blur(12px)"
      }}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          style={{
            textAlign: "center",
            color: item.href === "/wardrobe" ? "#1d1b19" : "#6f655b",
            fontWeight: item.href === "/wardrobe" ? 700 : 500,
            textDecoration: "none"
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
