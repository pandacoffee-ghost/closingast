import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DiscoverPage from "@/app/discover/page";

describe("shared bottom navigation", () => {
  it("keeps the bottom nav visible on discover page", async () => {
    render(await DiscoverPage());

    expect(screen.getByRole("navigation", { name: "底部导航" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "衣橱" })).toBeInTheDocument();
  });
});
