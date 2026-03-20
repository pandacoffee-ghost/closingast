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

  return {
    mode: "manual",
    platform,
    sourceUrl: url,
    reason: "parser-not-implemented"
  };
}
