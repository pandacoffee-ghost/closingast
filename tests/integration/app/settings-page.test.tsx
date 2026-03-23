import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SettingsPage from "@/app/settings/page";

describe("SettingsPage", () => {
  it("renders the profile hub instead of crashing", async () => {
    render(await SettingsPage());

    expect(screen.getByRole("heading", { name: "我的" })).toBeInTheDocument();
    expect(screen.getByText("本地环境")).toBeInTheDocument();
  });
});
