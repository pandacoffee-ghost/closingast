import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/import/route";

describe("POST /api/import", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns parsed metadata when a marketplace page exposes open graph fields", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        text: async () => `
          <html>
            <head>
              <meta property="og:title" content="米白针织开衫" />
              <meta property="og:image" content="https://img.example.com/cardigan.jpg" />
              <meta property="product:price:amount" content="199" />
              <meta property="og:site_name" content="简约衣橱店" />
            </head>
          </html>
        `
      })
    );

    const response = await POST(
      new Request("http://localhost/api/import", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          url: "https://item.taobao.com/item.htm?id=1"
        })
      })
    );

    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.mode).toBe("success");
    expect(body.platform).toBe("taobao");
    expect(body.title).toBe("米白针织开衫");
    expect(body.imageUrl).toBe("https://img.example.com/cardigan.jpg");
    expect(body.priceText).toBe("199");
    expect(body.storeName).toBe("简约衣橱店");
  });

  it("returns manual fallback metadata when parsing fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        text: async () => ""
      })
    );

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
