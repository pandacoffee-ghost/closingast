import { z } from "zod";
import { extractItemFromImage } from "@/lib/vision/provider";

const extractItemRequestSchema = z.object({
  imageDataUrl: z.string().min(1)
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = extractItemRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        error: "Invalid extraction payload",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const result = await extractItemFromImage(parsed.data);
    return Response.json(result, { status: 200 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown vision extraction error";
    console.error("[vision-extract-item]", reason, error);

    return Response.json(
      {
        error: "Vision extraction failed",
        reason
      },
      { status: 502 }
    );
  }
}
