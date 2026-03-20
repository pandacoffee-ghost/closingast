import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoginPage from "@/app/auth/login/page";

describe("LoginPage", () => {
  it("renders the login page with mobile-first copy", async () => {
    render(await LoginPage());

    expect(screen.getByText("登录你的衣橱")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "发送登录链接" })).toBeInTheDocument();
  });
});
