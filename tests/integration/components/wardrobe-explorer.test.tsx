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
            imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' />"
          },
          {
            id: "item-2",
            title: "蓝色牛仔裙",
            category: "裙子",
            color: "蓝色",
            season: ["summer"],
            styleTags: ["date"]
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
  });
});
