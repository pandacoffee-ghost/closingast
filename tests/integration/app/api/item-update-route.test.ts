import { describe, expect, it } from "vitest";
import { PATCH } from "@/app/api/items/[id]/route";

describe("PATCH /api/items/[id]", () => {
  it("updates an item and returns the saved record", async () => {
    const response = await PATCH(
      new Request("http://localhost/api/items/test-item", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title: "修改后的针织开衫",
          category: "top",
          season: ["autumn"],
          color: "奶油白",
          styleTags: [],
          sourcePlatform: "manual"
        })
      }),
      {
        params: Promise.resolve({ id: "test-item" })
      }
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.item.id).toBe("test-item");
    expect(body.item.title).toBe("修改后的针织开衫");
  });
});
