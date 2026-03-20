import { describe, expect, it } from "vitest";
import { detectPlatform } from "@/lib/imports/platform-detector";

describe("detectPlatform", () => {
  it("detects taobao and jd urls", () => {
    expect(detectPlatform("https://item.taobao.com/item.htm?id=1")).toBe("taobao");
    expect(detectPlatform("https://item.jd.com/1.html")).toBe("jd");
    expect(detectPlatform("https://example.com/item/1")).toBe("manual");
  });
});
