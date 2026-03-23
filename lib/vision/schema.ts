import { z } from "zod";
import { itemCategories, itemSeasons } from "@/lib/items/types";

export const visionExtractionSchema = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  category: z.enum(itemCategories).optional(),
  color: z.string().trim().min(1).max(40).optional(),
  seasons: z.array(z.enum(itemSeasons)).max(4).default([]),
  styleTags: z.array(z.string().trim().min(1).max(30)).default([]),
  description: z.string().trim().min(1).max(300).optional(),
  confidence: z.number().min(0).max(1).optional(),
  warnings: z.array(z.string().trim().min(1).max(120)).default([])
});

export type VisionExtraction = z.infer<typeof visionExtractionSchema>;
