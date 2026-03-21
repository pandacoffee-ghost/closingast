import { createSupabaseServerClient } from "@/lib/supabase/server";

type WardrobeItem = {
  id: string;
  title: string;
  category: string;
  season: string[];
  color: string;
  styleTags: string[];
  sourcePlatform: string;
  sourceUrl: string;
  storeName: string;
  price: string;
  notes: string;
};

const sampleItems: WardrobeItem[] = [
  {
    id: "sample-1",
    title: "米白针织开衫",
    category: "上装",
    season: ["春", "秋"],
    color: "米白",
    styleTags: ["通勤"],
    sourcePlatform: "淘宝",
    sourceUrl: "https://item.taobao.com/item.htm?id=1",
    storeName: "简约衣橱店",
    price: "199",
    notes: "版型偏宽松"
  },
  {
    id: "sample-2",
    title: "卡其短风衣",
    category: "外套",
    season: ["春", "秋"],
    color: "卡其",
    styleTags: ["通勤"],
    sourcePlatform: "京东",
    sourceUrl: "https://item.jd.com/1.html",
    storeName: "日常通勤馆",
    price: "299",
    notes: "适合早春"
  }
];

export async function getItemById(id: string) {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    const { data } = await supabase
      .from("items")
      .select("id, title, category, season, color, style_tags, source_platform, source_url, store_name, price, notes")
      .eq("id", id)
      .single();

    if (data) {
      return {
        id: data.id,
        title: data.title,
        category: data.category,
        season: data.season,
        color: data.color,
        styleTags: data.style_tags ?? [],
        sourcePlatform: data.source_platform,
        sourceUrl: data.source_url ?? "",
        storeName: data.store_name ?? "",
        price: data.price ? String(data.price) : "",
        notes: data.notes ?? ""
      };
    }
  }

  return sampleItems.find((item) => item.id === id) ?? sampleItems[0];
}

export async function getRecentItems() {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    const { data } = await supabase
      .from("items")
      .select("id, title, category, season, color, style_tags, source_platform, source_url, store_name, price, notes")
      .order("created_at", { ascending: false })
      .limit(8);

    if (data) {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        season: item.season,
        color: item.color,
        styleTags: item.style_tags ?? [],
        sourcePlatform: item.source_platform,
        sourceUrl: item.source_url ?? "",
        storeName: item.store_name ?? "",
        price: item.price ? String(item.price) : "",
        notes: item.notes ?? ""
      }));
    }
  }

  return sampleItems;
}

export async function getPossibleDuplicates() {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    const { data } = await supabase
      .from("duplicate_hints")
      .select("id, reason, similar:similar_item_id(title)")
      .order("score", { ascending: false })
      .limit(5);

    if (data) {
      return data.map((item) => ({
        id: item.id,
        title: Array.isArray(item.similar) ? item.similar[0]?.title ?? "相似衣物" : "相似衣物",
        reasons: [item.reason]
      }));
    }
  }

  return [
    {
      id: "dup-1",
      title: "米白开衫",
      reasons: ["同类目", "同颜色", "标题关键词相近"]
    }
  ];
}
