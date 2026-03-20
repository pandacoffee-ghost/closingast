import { itemInputSchema } from "@/lib/items/schema";
import { createItem } from "@/lib/items/mutations";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = itemInputSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Invalid item payload",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const item = await createItem(parsed.data);

  return Response.json({ item }, { status: 201 });
}
