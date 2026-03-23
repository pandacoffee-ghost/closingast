import { describe, expect, it } from "vitest";
import { visionExtractionSchema } from "@/lib/vision/schema";

describe("visionExtractionSchema", () => {
  it("accepts partial but normalized extraction results", () => {
    const parsed = visionExtractionSchema.parse({
      title: "米白针织开衫",
      category: "top",
      color: "米白",
      seasons: ["spring", "autumn"],
      styleTags: ["通勤"],
      description: "适合春秋通勤"
    });

    expect(parsed.category).toBe("top");
    expect(parsed.color).toBe("米白");
    expect(parsed.seasons).toEqual(["spring", "autumn"]);
  });
});
