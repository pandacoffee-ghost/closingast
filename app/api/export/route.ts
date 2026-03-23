import { getAllItems } from "@/lib/items/queries";

function escapeCsv(value: string) {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replaceAll("\"", "\"\"")}"`;
  }

  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const format = url.searchParams.get("format") ?? "json";
  const items = await getAllItems();

  if (format === "csv") {
    const header = ["title", "category", "color", "season", "styleTags", "notes"];
    const rows = items.map((item) =>
      [
        item.title,
        item.category,
        item.color,
        item.season.join(" / "),
        item.styleTags.join(" / "),
        item.notes
      ]
        .map((value) => escapeCsv(String(value ?? "")))
        .join(",")
    );

    return new Response([header.join(","), ...rows].join("\n"), {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": 'attachment; filename="wardrobe-export.csv"'
      }
    });
  }

  return Response.json(
    {
      exportedAt: new Date().toISOString(),
      items
    },
    {
      status: 200,
      headers: {
        "content-disposition": 'attachment; filename="wardrobe-export.json"'
      }
    }
  );
}
