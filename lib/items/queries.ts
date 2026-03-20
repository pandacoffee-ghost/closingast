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
  return sampleItems.find((item) => item.id === id) ?? sampleItems[0];
}

export async function getRecentItems() {
  return sampleItems;
}

export async function getPossibleDuplicates() {
  return [
    {
      id: "dup-1",
      title: "米白开衫",
      reasons: ["同类目", "同颜色", "标题关键词相近"]
    }
  ];
}
