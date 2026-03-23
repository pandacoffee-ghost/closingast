const seasonLabels: Record<string, string> = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬"
};

const categoryLabels: Record<string, string> = {
  top: "上装",
  bottom: "下装",
  dress: "裙子",
  outerwear: "外套",
  shoes: "鞋子",
  bag: "包袋"
};

type ItemSourceDetailsInput = {
  sourcePlatform: string;
  sourceUrl: string;
  storeName: string;
  price: string;
  createdAt: string;
  imageUrl?: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC"
  })
    .format(date)
    .replace(/\//g, "-")
    .replace(",", "");
}

export function formatSeasonLabel(seasons: string[]) {
  return seasons.map((season) => seasonLabels[season] ?? season).join(" / ");
}

export function formatCategoryLabel(category: string) {
  return categoryLabels[category] ?? category;
}

export function getItemSourceDetails(input: ItemSourceDetailsInput) {
  if (input.sourceUrl) {
    const label =
      input.sourcePlatform === "taobao"
        ? "淘宝商品链接导入"
        : input.sourcePlatform === "jd"
          ? "京东商品链接导入"
          : "商品链接导入";

    const details = [];

    if (input.storeName) {
      details.push({ label: "店铺", value: input.storeName });
    }

    if (input.price) {
      details.push({ label: "价格", value: input.price });
    }

    details.push({ label: "原链接", value: input.sourceUrl });

    return { label, details };
  }

  if (input.imageUrl) {
    return {
      label: "图片导入",
      details: [{ label: "导入时间", value: formatDateTime(input.createdAt) }]
    };
  }

  return {
    label: "手动录入",
    details: [{ label: "录入时间", value: formatDateTime(input.createdAt) }]
  };
}
