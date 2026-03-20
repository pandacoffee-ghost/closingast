import { describe, expect, it } from "vitest";
import { rankDuplicateHints } from "@/lib/items/duplicate-hints";

describe("rankDuplicateHints", () => {
  it("scores similar items higher when category and color match", () => {
    const candidate = {
      title: "米白针织开衫",
      category: "top",
      season: ["spring"],
      color: "cream",
      styleTags: ["commute"]
    };

    const existingItems = [
      {
        id: "a",
        title: "米白开衫",
        category: "top",
        season: ["spring"],
        color: "cream",
        styleTags: ["commute"]
      },
      {
        id: "b",
        title: "黑色长裙",
        category: "dress",
        season: ["autumn"],
        color: "black",
        styleTags: ["date"]
      }
    ];

    const hints = rankDuplicateHints(candidate, existingItems);

    expect(hints[0].id).toBe("a");
    expect(hints[0].score).toBeGreaterThan(hints[1].score);
  });
});
