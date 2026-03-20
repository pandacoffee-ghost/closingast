import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/import/route";

describe("POST /api/import", () => {
  it("returns manual fallback metadata when parsing fails", async () => {
    const response = await POST(
      new Request("http://localhost/api/import", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          url: "https://example.com/broken"
        })
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.mode).toBe("manual");
    expect(body.platform).toBe("manual");
  });
});
