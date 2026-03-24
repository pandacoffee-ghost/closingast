import { afterEach, describe, expect, it, vi } from "vitest";
import { extractItemFromImage } from "@/lib/vision/provider";

describe("extractItemFromImage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.VISION_API_BASE_URL;
    delete process.env.VISION_API_KEY;
    delete process.env.VISION_MODEL;
  });

  it("extracts normalized fields from a compatible model response", async () => {
    process.env.VISION_API_BASE_URL = "https://vision.example.com/v1";
    process.env.VISION_API_KEY = "test-key";
    process.env.VISION_MODEL = "vision-test";

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

    const result = await extractItemFromImage({
      imageDataUrl: "data:image/png;base64,abc"
    });

    expect(result.title).toBe("米白针织开衫");
    expect(result.category).toBe("top");
    expect(result.color).toBe("米白");
    expect(result.seasons).toEqual(["spring", "autumn"]);
    expect(vi.mocked(fetch).mock.calls[0]?.[1]).toMatchObject({
      method: "POST"
    });
    expect(JSON.parse(String(vi.mocked(fetch).mock.calls[0]?.[1]?.body))).toMatchObject({
      chat_template_kwargs: {
        enable_thinking: false
      }
    });
  });
});
