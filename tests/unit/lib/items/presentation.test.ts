import { describe, expect, it } from "vitest";
import {
  formatCategoryLabel,
  formatSeasonLabel,
  getItemSourceDetails
} from "@/lib/items/presentation";

describe("item presentation helpers", () => {
  it("localizes english season values into Chinese labels", () => {
    expect(formatSeasonLabel(["spring", "autumn"])).toBe("春 / 秋");
  });

  it("localizes english category values into Chinese labels", () => {
    expect(formatCategoryLabel("top")).toBe("上装");
  });

  it("describes image imports with imported time", () => {
    expect(
      getItemSourceDetails({
        sourcePlatform: "manual",
        sourceUrl: "",
        storeName: "",
        price: "",
        createdAt: "2026-03-23T08:00:00.000Z",
        imageUrl: "data:image/png;base64,abc"
      })
    ).toEqual({
      label: "图片导入",
      details: [{ label: "导入时间", value: "2026-03-23 08:00" }]
    });
  });

  it("describes link imports with source-specific metadata", () => {
    expect(
      getItemSourceDetails({
        sourcePlatform: "taobao",
        sourceUrl: "https://item.taobao.com/item.htm?id=1",
        storeName: "简约衣橱店",
        price: "199",
        createdAt: "2026-03-23T08:00:00.000Z",
        imageUrl: undefined
      })
    ).toEqual({
      label: "淘宝商品链接导入",
      details: [
        { label: "店铺", value: "简约衣橱店" },
        { label: "价格", value: "199" },
        { label: "原链接", value: "https://item.taobao.com/item.htm?id=1" }
      ]
    });
  });
});
