import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ItemDetailPage from "@/app/items/[id]/page";

describe("ItemDetailPage", () => {
  it("shows item details with source metadata", async () => {
    render(await ItemDetailPage({ params: Promise.resolve({ id: "sample-1" }) }));

    expect(screen.getByRole("heading", { name: "米白针织开衫" })).toBeInTheDocument();
    expect(screen.getByText("来源")).toBeInTheDocument();
    expect(screen.getByText("淘宝")).toBeInTheDocument();
  });
});
