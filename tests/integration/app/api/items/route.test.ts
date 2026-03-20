import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/items/route";

describe("POST /api/items", () => {
  it("creates an item from a valid manual payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/items", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title: "白色衬衫",
          category: "top",
          season: ["spring"],
          color: "white",
          styleTags: ["commute"]
        })
      })
    );

    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.item.title).toBe("白色衬衫");
  });
});
