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

  it("prefills form fields from image recognition after upload", async () => {
    const user = userEvent.setup();
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          title: "黑色西装外套",
          category: "outerwear",
          color: "黑色",
          seasons: ["autumn", "winter"],
          styleTags: ["通勤"],
          description: "适合秋冬通勤穿着"
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          title: "深灰羊毛外套",
          category: "outerwear",
          color: "深灰",
          seasons: ["winter"],
          styleTags: ["通勤"],
          description: "更适合冬季正式场景"
        })
      });

    vi.stubGlobal("fetch", fetchMock);

    render(<ItemFormClient />);

    const file = new File(["image-binary"], "coat.png", { type: "image/png" });
    await user.upload(screen.getByLabelText("上传衣服图片"), file);

    await waitFor(() => {
      expect(screen.getByDisplayValue("黑色西装外套")).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("黑色")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /类目/ })).toHaveValue("outerwear");
    expect(screen.getByDisplayValue("适合秋冬通勤穿着")).toBeInTheDocument();
    expect(screen.getAllByText("AI建议").length).toBeGreaterThan(0);

    await user.clear(screen.getByLabelText(/颜色/));
    await user.type(screen.getByLabelText(/颜色/), "藏青");

    await waitFor(() => {
      expect(screen.queryByText("颜色 · AI建议")).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "重新识别" }));

    await waitFor(() => {
      expect(screen.getByDisplayValue("深灰羊毛外套")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
