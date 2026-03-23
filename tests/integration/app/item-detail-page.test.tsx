import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ItemDetailPage from "@/app/items/[id]/page";

describe("ItemDetailPage", () => {
  it("shows item details with source metadata", async () => {
    render(await ItemDetailPage({ params: Promise.resolve({ id: "sample-1" }) }));

    expect(screen.getByRole("heading", { name: "米白针织开衫" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "米白针织开衫" })).toBeInTheDocument();
    expect(screen.getByText("来源")).toBeInTheDocument();
    expect(screen.getByText("淘宝商品链接导入")).toBeInTheDocument();
    expect(screen.queryByText("可能重复")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "编辑这件衣服" })).toHaveAttribute(
      "href",
      "/items/sample-1/edit"
    );
  });
});
