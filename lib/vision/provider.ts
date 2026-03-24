import { buildVisionPrompt } from "./prompt";
import { visionExtractionSchema, type VisionExtraction } from "./schema";

type ExtractItemInput = {
  imageDataUrl: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env: ${name}`);
  }

  return value;
}

function extractJsonText(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "choices" in payload &&
    Array.isArray((payload as { choices?: unknown[] }).choices)
  ) {
    const content = (payload as { choices: Array<{ message?: { content?: string } }> }).choices[0]?.message?.content;

    if (typeof content === "string") {
      return content;
    }
  }

  throw new Error("Vision provider returned an unsupported payload");
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => toStringArray(entry));
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value
      .split(/[,，/、]/)
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  return [];
}

function normalizeVisionPayload(payload: Record<string, unknown>) {
  const normalized = { ...payload } as Record<string, unknown>;

  normalized.seasons = toStringArray(payload.seasons);
  normalized.styleTags = toStringArray(payload.styleTags);

  if (typeof payload.description === "string") {
    normalized.description = payload.description.slice(0, 300);
  }

  return normalized;
}

export async function extractItemFromImage(input: ExtractItemInput): Promise<VisionExtraction> {
  const baseUrl = getRequiredEnv("VISION_API_BASE_URL");
  const apiKey = getRequiredEnv("VISION_API_KEY");
  const model = getRequiredEnv("VISION_MODEL");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      chat_template_kwargs: {
        enable_thinking: false
      },
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: buildVisionPrompt() },
            {
              type: "image_url",
              image_url: {
                url: input.imageDataUrl
              }
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Vision provider request failed");
  }

  const payload = await response.json();
  const content = extractJsonText(payload);
  const parsed = normalizeVisionPayload(JSON.parse(content));

  return visionExtractionSchema.parse(parsed);
}
