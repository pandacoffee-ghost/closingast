import { deleteItem } from "@/lib/items/mutations";

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
