import { createSupabaseServerClient } from "@/lib/supabase/server";

type WardrobeItem = {
  id: string;
  title: string;
  category: string;
  season: string[];
  color: string;
  styleTags: string[];
  imageUrl?: string;
  sourcePlatform: string;
  sourceUrl: string;
  storeName: string;
  price: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

const sampleItems: WardrobeItem[] = [
  {
    id: "sample-1",
    title: "米白针织开衫",
    category: "上装",
    season: ["春", "秋"],
    color: "米白",
    styleTags: ["通勤"],
    imageUrl:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 400'><rect width='320' height='400' rx='28' fill='%23efe2cf'/><path d='M110 92c18-16 82-16 100 0l38 48-34 30-18-18v154c0 10-8 18-18 18h-36c-10 0-18-8-18-18V152l-18 18-34-30 38-48z' fill='%23d7c2aa'/></svg>",
    sourcePlatform: "taobao",
    sourceUrl: "https://item.taobao.com/item.htm?id=1",
    storeName: "简约衣橱店",
    price: "199",
    notes: "版型偏宽松",
    createdAt: "2026-03-20T08:00:00.000Z",
    updatedAt: "2026-03-20T08:00:00.000Z"
  },
  {
    id: "sample-2",
    title: "卡其短风衣",
    category: "外套",
    season: ["春", "秋"],
    color: "卡其",
    styleTags: ["通勤"],
    imageUrl: undefined,
    sourcePlatform: "jd",
    sourceUrl: "https://item.jd.com/1.html",
    storeName: "日常通勤馆",
    price: "299",
    notes: "适合早春",
    createdAt: "2026-03-21T08:00:00.000Z",
    updatedAt: "2026-03-21T08:00:00.000Z"
  }
];

export async function getItemById(id: string) {
  const supabase = createSupabaseServerClient();

  if (supabase) {
    const { data } = await supabase
      .from("items")
      .select("id, title, category, season, color, style_tags, source_platform, source_url, store_name, price, notes, created_at, updated_at, item_images(image_path,is_primary,sort_order)")
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
        imageUrl: Array.isArray(data.item_images) ? data.item_images[0]?.image_path : undefined,
        sourcePlatform: data.source_platform,
        sourceUrl: data.source_url ?? "",
        storeName: data.store_name ?? "",
        price: data.price ? String(data.price) : "",
        notes: data.notes ?? "",
        createdAt: data.created_at,
        updatedAt: data.updated_at
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
      .select("id, title, category, season, color, style_tags, source_platform, source_url, store_name, price, notes, created_at, updated_at, item_images(image_path,is_primary,sort_order)")
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
        imageUrl: Array.isArray(item.item_images) ? item.item_images[0]?.image_path : undefined,
        sourcePlatform: item.source_platform,
        sourceUrl: item.source_url ?? "",
        storeName: item.store_name ?? "",
        price: item.price ? String(item.price) : "",
        notes: item.notes ?? "",
        createdAt: item.created_at,
        updatedAt: item.updated_at
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
      .select("id, reason, similar:similar_item_id(title,item_images(image_path,is_primary,sort_order))")
      .order("score", { ascending: false })
      .limit(5);

    if (data) {
      return data.map((item) => ({
        id: item.id,
        title: Array.isArray(item.similar) ? item.similar[0]?.title ?? "相似衣物" : "相似衣物",
        imageUrl: Array.isArray(item.similar)
          ? Array.isArray(item.similar[0]?.item_images)
            ? item.similar[0]?.item_images[0]?.image_path
            : undefined
          : undefined,
        reasons: [item.reason]
      }));
    }
  }

  return [
    {
      id: "dup-1",
      title: "米白开衫",
      imageUrl: undefined,
      reasons: ["同类目", "同颜色", "标题关键词相近"]
    }
  ];
}
