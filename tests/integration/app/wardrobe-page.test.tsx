import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WardrobePage from "@/app/wardrobe/page";

describe("WardrobePage", () => {
  it("renders wardrobe items as image-first cards", async () => {
    render(await WardrobePage());

    expect(screen.getByRole("heading", { name: "衣橱" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("搜索白色针织 / 卡其风衣")).toBeInTheDocument();
    expect(screen.getByText("米白针织开衫")).toBeInTheDocument();
    expect(screen.getByText("上装 · 米白")).toBeInTheDocument();
    expect(screen.queryByText("top · 米白")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "查看 米白针织开衫 详情" })).toBeInTheDocument();
  });
});
