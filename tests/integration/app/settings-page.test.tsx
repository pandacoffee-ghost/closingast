import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("renders the profile hub instead of crashing", async () => {
    render(await SettingsPage());

    expect(screen.getByRole("heading", { name: "我的" })).toBeInTheDocument();
    expect(screen.getByText("衣物总数")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByText("闲置件数")).not.toBeInTheDocument();
    expect(screen.getByText("类目分布")).toBeInTheDocument();
    expect(screen.getByText("上装")).toBeInTheDocument();
    expect(screen.getByText("颜色分布")).toBeInTheDocument();
    expect(screen.getByText("米白")).toBeInTheDocument();
  });
});
