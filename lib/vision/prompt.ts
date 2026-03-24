export function buildVisionPrompt() {
  return [
    "请识别衣物图片，并返回 JSON。",
    "所有可读字段必须使用中文，不要返回英文标签、英文颜色、英文场景或英文描述。",
    "字段仅允许包含：title, category, color, seasons, styleTags, description。",
    "category 只能是 top, bottom, dress, outerwear, shoes, bag。",
    "seasons 只能是 spring, summer, autumn, winter。"
  ].join(" ");
}
