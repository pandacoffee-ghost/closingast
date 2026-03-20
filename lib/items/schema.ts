import { z } from "zod";
import { itemCategories, itemSeasons, itemStatuses, sourcePlatforms } from "./types";

export const itemInputSchema = z.object({
  title: z.string().trim().min(1).max(120),
  category: z.enum(itemCategories),
  season: z.array(z.enum(itemSeasons)).min(1),
  color: z.string().trim().min(1).max(40),
  styleTags: z.array(z.string().trim().min(1).max(30)).default([]),
  notes: z.string().trim().max(300).optional(),
  status: z.enum(itemStatuses).default("active"),
  sourcePlatform: z.enum(sourcePlatforms).default("manual")
});

export const itemRecordSchema = itemInputSchema.extend({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type ItemInput = z.infer<typeof itemInputSchema>;
export type ItemRecord = z.infer<typeof itemRecordSchema>;
