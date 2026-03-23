import { describe, expect, it } from "vitest";
import { DELETE } from "@/app/api/items/[id]/route";

describe("DELETE /api/items/[id]", () => {
  it("deletes an item and returns 204", async () => {
    const response = await DELETE(
      new Request("http://localhost/api/items/test-item", {
        method: "DELETE"
      }),
      {
        params: Promise.resolve({ id: "test-item" })
      }
    );

    expect(response.status).toBe(204);
  });
});
