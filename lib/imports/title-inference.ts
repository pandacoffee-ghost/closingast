type InferredFields = {
  category?: string;
  color?: string;
};

const categoryRules: Array<[string[], string]> = [
  [["风衣", "外套", "大衣", "夹克"], "outerwear"],
  [["裙", "连衣裙", "半身裙"], "dress"],
  [["裤", "西裤", "牛仔裤", "长裤", "短裤"], "bottom"],
  [["衬衫", "针织", "毛衣", "开衫", "背心", "T恤", "上衣"], "top"]
];

const colorRules: Array<[string[], string]> = [
  [["米白", "奶油白"], "米白"],
  [["白色", "纯白"], "白色"],
  [["黑色"], "黑色"],
  [["卡其"], "卡其"],
  [["蓝色", "牛仔蓝"], "蓝色"],
  [["灰色"], "灰色"],
  [["棕色", "咖色"], "棕色"]
];

export function inferFieldsFromTitle(title: string): InferredFields {
  const normalizedTitle = title.trim();
  const inferred: InferredFields = {};

  for (const [keywords, value] of categoryRules) {
    if (keywords.some((keyword) => normalizedTitle.includes(keyword))) {
      inferred.category = value;
      break;
    }
  }

  for (const [keywords, value] of colorRules) {
    if (keywords.some((keyword) => normalizedTitle.includes(keyword))) {
      inferred.color = value;
      break;
    }
  }

  return inferred;
}
