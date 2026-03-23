import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/vision/extract-item/route";

describe("POST /api/vision/extract-item", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns extracted fields for a valid image payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: JSON.stringify({
                  title: "米白针织开衫",
                  category: "top",
                  color: "米白",
                  seasons: ["spring", "autumn"],
                  styleTags: ["通勤"],
                  description: "适合春秋通勤"
                })
              }
            }
          ]
        })
      })
    );

    process.env.VISION_API_BASE_URL = "https://vision.example.com/v1";
    process.env.VISION_API_KEY = "test-key";
    process.env.VISION_MODEL = "vision-test";

    const response = await POST(
      new Request("http://localhost/api/vision/extract-item", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          imageDataUrl: "data:image/png;base64,abc"
        })
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.title).toBe("米白针织开衫");
    expect(body.category).toBe("top");
  });

  it("returns 400 for an invalid payload", async () => {
    const response = await POST(
      new Request("http://localhost/api/vision/extract-item", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          imageDataUrl: ""
        })
      })
    );

    expect(response.status).toBe(400);
  });
});
