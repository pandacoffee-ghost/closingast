import { itemInputSchema, type ItemInput } from "@/lib/items/schema";

export async function createItem(input: ItemInput) {
  const parsed = itemInputSchema.parse(input);
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    userId: "00000000-0000-0000-0000-000000000000",
    createdAt: now,
    updatedAt: now,
    ...parsed
  };
}
