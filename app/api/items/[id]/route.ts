import { itemInputSchema } from "@/lib/items/schema";
import { deleteItem, updateItem } from "@/lib/items/mutations";

type DeleteRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_request: Request, context: DeleteRouteContext) {
  const { id } = await context.params;
  await deleteItem(id);
  return new Response(null, { status: 204 });
}

export async function PATCH(request: Request, context: DeleteRouteContext) {
  const { id } = await context.params;
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

  const item = await updateItem(id, parsed.data);
  return Response.json({ item }, { status: 200 });
}
