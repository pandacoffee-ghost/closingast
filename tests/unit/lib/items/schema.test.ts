import { describe, expect, it } from "vitest";
import { itemInputSchema } from "@/lib/items/schema";

describe("itemInputSchema", () => {
  it("parses a valid wardrobe item payload", () => {
    expect(() =>
      itemInputSchema.parse({
        title: "米白针织开衫",
        category: "top",
        season: ["spring", "autumn"],
        color: "cream",
        styleTags: ["commute"]
      })
    ).not.toThrow();
  });
});
