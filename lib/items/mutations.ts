import { itemInputSchema, type ItemInput } from "@/lib/items/schema";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createItem(input: ItemInput) {
  const parsed = itemInputSchema.parse(input);
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("items")
      .insert({
        user_id: "11111111-1111-1111-1111-111111111111",
        title: parsed.title,
        category: parsed.category,
        season: parsed.season,
        color: parsed.color,
        style_tags: parsed.styleTags,
        source_platform: parsed.sourcePlatform,
        status: parsed.status,
        notes: parsed.notes ?? null
      })
      .select(
        "id, user_id, title, category, season, color, style_tags, source_platform, notes, status, created_at, updated_at"
      )
      .single();

    if (error) {
      throw error;
    }

    if (parsed.imageDataUrl) {
      const { error: imageError } = await supabase.from("item_images").insert({
        item_id: data.id,
        image_path: parsed.imageDataUrl,
        sort_order: 0,
        is_primary: true
      });

      if (imageError) {
        throw imageError;
      }
    }

    return {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      category: data.category,
      season: data.season,
      color: data.color,
      styleTags: data.style_tags,
      imageDataUrl: parsed.imageDataUrl,
      sourcePlatform: data.source_platform,
      notes: data.notes ?? undefined,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    };
  }

  return {
    id: crypto.randomUUID(),
    userId: "00000000-0000-0000-0000-000000000000",
    createdAt: now,
    updatedAt: now,
    ...parsed
  };
}
