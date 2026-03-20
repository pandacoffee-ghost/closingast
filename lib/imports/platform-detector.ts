import type { SourcePlatform } from "@/lib/items/types";

export function detectPlatform(url: string): SourcePlatform {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    if (hostname.includes("taobao.com")) {
      return "taobao";
    }

    if (hostname.includes("jd.com")) {
      return "jd";
    }

    return "manual";
  } catch {
    return "manual";
  }
}
