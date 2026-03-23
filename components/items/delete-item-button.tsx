"use client";

import React, { useState } from "react";

type DeleteItemButtonProps = {
  itemId: string;
};

export function DeleteItemButton({ itemId }: DeleteItemButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm("确认删除这件衣服吗？删除后无法恢复。");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    const response = await fetch(`/api/items/${itemId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      setIsDeleting(false);
      window.alert("删除失败，请稍后再试。");
      return;
    }

    window.location.href = "/wardrobe";
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      style={{
        border: 0,
        borderRadius: "999px",
        padding: "14px 18px",
        fontWeight: 700,
        background: "#b2441e",
        color: "#fffaf2",
        opacity: isDeleting ? 0.7 : 1
      }}
    >
      {isDeleting ? "删除中..." : "删除这件衣服"}
    </button>
  );
}
