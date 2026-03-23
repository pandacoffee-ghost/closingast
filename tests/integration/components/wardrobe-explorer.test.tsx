import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { WardrobeExplorer } from "@/components/wardrobe/wardrobe-explorer";

describe("WardrobeExplorer", () => {
  it("supports searching by localized season and style tags", async () => {
    const user = userEvent.setup();

    render(
      <WardrobeExplorer
        items={[
          {
            id: "item-1",
            title: "米白针织开衫",
            category: "上装",
            color: "米白",
            season: ["spring", "autumn"],
            styleTags: ["commute"],
            notes: "版型偏宽松，适合春秋通勤",
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' />"
          },
          {
            id: "item-2",
            title: "蓝色牛仔裙",
            category: "裙子",
            color: "蓝色",
            season: ["summer"],
            styleTags: ["date"],
            notes: "适合周末出游"
          }
        ]}
      />
    );

    const searchInput = screen.getByRole("textbox", { name: "搜索衣物" });

    await user.type(searchInput, "春");
    expect(screen.getByText("米白针织开衫")).toBeInTheDocument();
    expect(screen.queryByText("蓝色牛仔裙")).not.toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "通勤");
    expect(screen.getByText("米白针织开衫")).toBeInTheDocument();
    expect(screen.queryByText("蓝色牛仔裙")).not.toBeInTheDocument();

    await user.clear(searchInput);
    await user.type(searchInput, "宽松");
    expect(screen.getByText("米白针织开衫")).toBeInTheDocument();
    expect(screen.queryByText("蓝色牛仔裙")).not.toBeInTheDocument();
  });

  it("shows a load more action when the wardrobe has many items", async () => {
    const user = userEvent.setup();

    render(
      <WardrobeExplorer
        items={[
          {
            id: "item-1",
            title: "米白针织开衫",
            category: "上装",
            color: "米白",
            season: ["spring"],
            styleTags: ["commute"]
          },
          {
            id: "item-2",
            title: "蓝色牛仔裙",
            category: "裙子",
            color: "蓝色",
            season: ["summer"],
            styleTags: ["date"]
          },
          {
            id: "item-3",
            title: "卡其短风衣",
            category: "外套",
            color: "卡其",
            season: ["autumn"],
            styleTags: ["commute"]
          },
          {
            id: "item-4",
            title: "黑色西裤",
            category: "下装",
            color: "黑色",
            season: ["autumn"],
            styleTags: ["commute"]
          },
          {
            id: "item-5",
            title: "白色衬衫",
            category: "上装",
            color: "白色",
            season: ["spring"],
            styleTags: ["commute"]
          }
        ]}
      />
    );

    expect(screen.queryByText("白色衬衫")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "继续加载" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "继续加载" }));

    expect(screen.getByText("白色衬衫")).toBeInTheDocument();
  });
});
