import { z } from "zod";
import { parseProductLink } from "@/lib/imports/link-parser";

const importRequestSchema = z.object({
  url: z.string().url()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = importRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Invalid import payload",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const result = await parseProductLink(parsed.data.url);
  return Response.json(result, { status: 200 });
}
