import type { ItemInput } from "./schema";

type ExistingItem = ItemInput & { id: string };

type DuplicateHint = {
  id: string;
  title: string;
  score: number;
  reasons: string[];
};

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .flatMap((part) => part.split(/[-_/]/))
    .filter(Boolean);
}

export function rankDuplicateHints(candidate: ItemInput, existingItems: ExistingItem[]): DuplicateHint[] {
  return existingItems
    .map((item) => {
      let score = 0;
      const reasons: string[] = [];

      if (item.category === candidate.category) {
        score += 4;
        reasons.push("同类目");
      }

      if (item.color === candidate.color) {
        score += 3;
        reasons.push("同颜色");
      }

      const candidateTokens = tokenize(candidate.title);
      const existingTokens = new Set(tokenize(item.title));
      const overlap = candidateTokens.filter((token) => existingTokens.has(token)).length;

      if (overlap > 0) {
        score += overlap * 2;
        reasons.push("标题关键词相近");
      }

      return {
        id: item.id,
        title: item.title,
        score,
        reasons
      };
    })
    .sort((left, right) => right.score - left.score);
}
