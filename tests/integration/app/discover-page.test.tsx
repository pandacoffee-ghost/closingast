import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DiscoverPage from "@/app/discover/page";

describe("DiscoverPage", () => {
  it("renders discover collections for recent and possible duplicates", async () => {
    render(await DiscoverPage());

    expect(screen.getByRole("heading", { name: "发现" })).toBeInTheDocument();
    expect(screen.getByText("可能重复")).toBeInTheDocument();
    expect(screen.getByText("最近新增")).toBeInTheDocument();
  });
});
