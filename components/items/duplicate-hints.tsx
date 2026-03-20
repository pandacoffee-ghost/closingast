import React from "react";

type DuplicateHintsProps = {
  hints: Array<{
    id: string;
    title: string;
    score: number;
    reasons: string[];
  }>;
};

export function DuplicateHints({ hints }: DuplicateHintsProps) {
  if (hints.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        display: "grid",
        gap: "10px",
        padding: "18px",
        borderRadius: "20px",
        background: "#fff7ed",
        border: "1px solid #efcfaa"
      }}
    >
      <h2 style={{ margin: 0, fontSize: "18px" }}>可能重复</h2>
      {hints.slice(0, 3).map((hint) => (
        <article
          key={hint.id}
          style={{ display: "grid", gap: "4px", padding: "12px 0", borderTop: "1px solid #efd8bb" }}
        >
          <strong>{hint.title}</strong>
          <span style={{ color: "#6d6459", fontSize: "14px" }}>
            {hint.reasons.join(" · ")} · 分数 {hint.score}
          </span>
        </article>
      ))}
    </section>
  );
}
