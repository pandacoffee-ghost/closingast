import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ItemFormClient } from "@/components/items/item-form-client";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn()
  })
}));

describe("ItemFormClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("prefills form fields from parsed link metadata", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          mode: "success",
          platform: "taobao",
          title: "米白针织开衫女春季短款",
          sourceUrl: "https://item.taobao.com/item.htm?id=1",
          imageUrl: "https://img.example.com/cardigan.jpg",
          storeName: "简约衣橱店",
          priceText: "199"
        })
      })
    );

    render(<ItemFormClient />);

    await user.type(screen.getByPlaceholderText("粘贴淘宝 / 京东商品链接"), "https://item.taobao.com/item.htm?id=1");
    await user.click(screen.getByRole("button", { name: "解析链接" }));

    await waitFor(() => {
      expect(screen.getByDisplayValue("米白针织开衫女春季短款")).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("米白")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "类目" })).toHaveValue("top");
  });
});
