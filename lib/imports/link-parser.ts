import { detectPlatform } from "./platform-detector";

type ImportResult =
  | {
      mode: "success";
      platform: "taobao" | "jd";
      title: string;
      sourceUrl: string;
      imageUrl: string | null;
      storeName: string | null;
      priceText: string | null;
    }
  | {
      mode: "manual";
      platform: "manual" | "taobao" | "jd";
      sourceUrl: string;
      reason: string;
    };

function extractMetaContent(html: string, key: string) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${key}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["'][^>]*>`, "i")
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return null;
}

function extractTitle(html: string) {
  return extractMetaContent(html, "og:title") ?? extractMetaContent(html, "twitter:title");
}

function extractImage(html: string) {
  return extractMetaContent(html, "og:image") ?? extractMetaContent(html, "twitter:image");
}

function extractPrice(html: string) {
  return (
    extractMetaContent(html, "product:price:amount") ??
    extractMetaContent(html, "og:price:amount") ??
    html.match(/"price"\s*:\s*"([^"]+)"/i)?.[1] ??
    null
  );
}

function extractStoreName(html: string) {
  return (
    extractMetaContent(html, "og:site_name") ??
    html.match(/"shopName"\s*:\s*"([^"]+)"/i)?.[1] ??
    null
  );
}

export async function parseProductLink(url: string): Promise<ImportResult> {
  const platform = detectPlatform(url);

  if (platform === "manual") {
    return {
      mode: "manual",
      platform,
      sourceUrl: url,
      reason: "unsupported-platform"
    };
  }

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      return {
        mode: "manual",
        platform,
        sourceUrl: url,
        reason: "fetch-failed"
      };
    }

    const html = await response.text();
    const title = extractTitle(html);
    const imageUrl = extractImage(html);
    const priceText = extractPrice(html);
    const storeName = extractStoreName(html);

    if (!title && !imageUrl && !priceText && !storeName) {
      return {
        mode: "manual",
        platform,
        sourceUrl: url,
        reason: "metadata-not-found"
      };
    }

    return {
      mode: "success",
      platform,
      title: title ?? "未命名商品",
      sourceUrl: url,
      imageUrl,
      storeName,
      priceText
    };
  } catch {
    return {
      mode: "manual",
      platform,
      sourceUrl: url,
      reason: "fetch-failed"
    };
  }
}
