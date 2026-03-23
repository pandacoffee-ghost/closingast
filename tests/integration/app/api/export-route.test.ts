import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/export/route";

describe("GET /api/export", () => {
  it("returns JSON export data", async () => {
    const response = await GET(new Request("http://localhost/api/export?format=json"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");

    const body = await response.json();
    expect(Array.isArray(body.items)).toBe(true);
  });

  it("returns CSV export data", async () => {
    const response = await GET(new Request("http://localhost/api/export?format=csv"));

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");

    const body = await response.text();
    expect(body).toContain("title,category,color");
  });
});
